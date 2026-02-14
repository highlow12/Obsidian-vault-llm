import fs from "node:fs";
import os from "node:os";
import path from "node:path";

export type Provider = "openai" | "local";

type InitOptions = {
  vault: string;
  provider: Provider;
  apiKey?: string;
};

function yamlQuote(value: string): string {
  return `"${value.replace(/"/g, '\\"')}"`;
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

export function main(argv: string[] = process.argv.slice(2)): number {
  if (argv.length === 0 || argv[0] !== "init") {
    return 1;
  }

  let vault: string | undefined;
  let provider: Provider = "openai";
  let apiKey: string | undefined;

  for (let i = 1; i < argv.length; i += 1) {
    const arg = argv[i];

    if (arg === "--vault") {
      vault = argv[i + 1];
      i += 1;
    } else if (arg === "--provider") {
      const value = argv[i + 1] as Provider;
      if (value === "openai" || value === "local") {
        provider = value;
      } else {
        return 1;
      }
      i += 1;
    } else if (arg === "--api-key") {
      apiKey = argv[i + 1];
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

if (require.main === module) {
  process.exit(main());
}
