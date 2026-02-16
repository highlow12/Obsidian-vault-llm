import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { Conversation, ConversationTurn, saveConversation } from "./conversation";

export type Provider = "openai" | "local";

type InitOptions = {
  vault: string;
  provider: Provider;
  apiKey?: string;
};

function yamlQuote(value: string): string {
  const escapedValue = value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  return `"${escapedValue}"`;
}

function buildConfig(vaultPath: string, provider: Provider, apiKeyRef?: string): string {
  const lines = [
    `vault_path: ${yamlQuote(vaultPath)}`,
    `provider: ${yamlQuote(provider)}`,
    "default_k: 8",
    "chunk_size: 400",
    "filters: {}"
  ];

  if (apiKeyRef) {
    lines.push(`api_key_ref: ${yamlQuote(apiKeyRef)}`);
  }

  return `${lines.join("\n")}\n`;
}

export function runInit(options: InitOptions): number {
  const vaultPath = path.resolve(options.vault);
  if (!fs.existsSync(vaultPath) || !fs.statSync(vaultPath).isDirectory()) {
    console.log("오류: 유효한 볼트 디렉터리를 입력해 주세요.");
    return 1;
  }

  const configDir = path.join(os.homedir(), ".ovl");
  fs.mkdirSync(configDir, { recursive: true });

  let apiKeyRef: string | undefined;
  if (options.apiKey) {
    const apiKeyPath = path.join(configDir, "api_key.txt");
    const fd = fs.openSync(apiKeyPath, "w", 0o600);
    fs.writeFileSync(fd, `${options.apiKey}\n`, { encoding: "utf-8" });
    fs.closeSync(fd);
    apiKeyRef = `file:${apiKeyPath}`;
  }

  const configPath = path.join(configDir, "config.yaml");
  fs.writeFileSync(
    configPath,
    buildConfig(vaultPath, options.provider, apiKeyRef),
    "utf-8"
  );

  console.log(`초기화 완료: ${configPath}`);
  return 0;
}

// 설정 파일에서 볼트 경로 읽기
function getVaultPath(): string | undefined {
  const configPath = path.join(os.homedir(), ".ovl", "config.yaml");
  if (!fs.existsSync(configPath)) {
    return undefined;
  }
  
  const content = fs.readFileSync(configPath, "utf-8");
  const match = content.match(/vault_path:\s*"([^"\\]*(?:\\.[^"\\]*)*)"/);
  if (!match) {
    return undefined;
  }
  
  // JSON.parse를 사용하여 이스케이프 시퀀스를 올바르게 처리
  try {
    return JSON.parse(`"${match[1]}"`);
  } catch {
    // 파싱 실패 시 원본 반환
    return match[1];
  }
}

type SaveConversationOptions = {
  sessionId: string;
  output?: string;
};

export function runSaveConversation(
  turns: ConversationTurn[],
  options: SaveConversationOptions
): number {
  let targetDir: string;
  
  if (options.output) {
    targetDir = path.resolve(options.output);
  } else {
    const vaultPath = getVaultPath();
    if (!vaultPath) {
      console.log("오류: 볼트 경로를 찾을 수 없습니다. 먼저 'ovl init'을 실행하거나 --output을 지정하세요.");
      return 1;
    }
    targetDir = vaultPath;
  }
  
  if (!fs.existsSync(targetDir)) {
    console.log(`오류: 대상 디렉토리가 존재하지 않습니다: ${targetDir}`);
    return 1;
  }
  
  const conversation: Conversation = {
    sessionId: options.sessionId,
    turns,
    createdAt: new Date(),
  };
  
  try {
    const filepath = saveConversation(conversation, targetDir);
    console.log(`대화가 저장되었습니다: ${filepath}`);
    return 0;
  } catch (error) {
    console.log(`오류: ${error instanceof Error ? error.message : String(error)}`);
    return 1;
  }
}

export function main(argv: string[] = process.argv.slice(2)): number {
  if (argv.length === 0) {
    return 1;
  }
  
  const command = argv[0];
  
  if (command === "init") {
    return runInitCommand(argv);
  } else if (command === "save-conversation") {
    return runSaveConversationCommand(argv);
  }
  
  return 1;
}

function runInitCommand(argv: string[]): number {

  let vault: string | undefined;
  let provider: Provider = "openai";
  let apiKey: string | undefined;

  for (let i = 1; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = argv[i + 1];
    if ((arg === "--vault" || arg === "--provider" || arg === "--api-key") && !next) {
      return 1;
    }

    if (arg === "--vault") {
      vault = next;
      i += 1;
    } else if (arg === "--provider") {
      const value = next as Provider;
      if (value === "openai" || value === "local") {
        provider = value;
      } else {
        return 1;
      }
      i += 1;
    } else if (arg === "--api-key") {
      apiKey = next;
      i += 1;
    } else {
      return 1;
    }
  }

  if (!vault) {
    return 1;
  }

  return runInit({ vault, provider, apiKey });
}

function runSaveConversationCommand(argv: string[]): number {
  let sessionId: string | undefined;
  let output: string | undefined;
  let inputFile: string | undefined;
  
  for (let i = 1; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = argv[i + 1];
    
    if ((arg === "--session-id" || arg === "--output" || arg === "--input") && !next) {
      return 1;
    }
    
    if (arg === "--session-id") {
      sessionId = next;
      i += 1;
    } else if (arg === "--output") {
      output = next;
      i += 1;
    } else if (arg === "--input") {
      inputFile = next;
      i += 1;
    } else {
      return 1;
    }
  }
  
  if (!sessionId) {
    console.log("오류: --session-id는 필수입니다.");
    return 1;
  }
  
  if (!inputFile) {
    console.log("오류: --input은 필수입니다.");
    return 1;
  }
  
  if (!fs.existsSync(inputFile)) {
    console.log(`오류: 입력 파일이 존재하지 않습니다: ${inputFile}`);
    return 1;
  }
  
  let turns: ConversationTurn[];
  try {
    const content = fs.readFileSync(inputFile, "utf-8");
    turns = JSON.parse(content) as ConversationTurn[];
  } catch (error) {
    console.log(`오류: JSON 파일을 읽을 수 없습니다: ${error instanceof Error ? error.message : String(error)}`);
    return 1;
  }
  
  return runSaveConversation(turns, { sessionId, output });
}

if (require.main === module) {
  process.exit(main());
}
