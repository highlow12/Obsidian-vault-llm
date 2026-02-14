import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { main } from "../src/ovl";

function makeTempDir(): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), "ovl-test-"));
}

test("init는 필수 설정을 포함한 config 파일을 생성한다", () => {
  const originalHome = process.env.HOME;
  const tempHome = makeTempDir();
  const tempVault = makeTempDir();

  process.env.HOME = tempHome;
  const code = main(["init", "--vault", tempVault, "--provider", "openai"]);

  assert.equal(code, 0);
  const configPath = path.join(tempHome, ".ovl", "config.yaml");
  assert.equal(fs.existsSync(configPath), true);

  const content = fs.readFileSync(configPath, "utf-8");
  assert.match(content, /vault_path: "/);
  assert.match(content, /provider: "openai"/);
  assert.match(content, /default_k: 8/);

  process.env.HOME = originalHome;
});

test("init는 API 키 파일을 저장하고 참조를 config에 기록한다", () => {
  const originalHome = process.env.HOME;
  const tempHome = makeTempDir();
  const tempVault = makeTempDir();

  process.env.HOME = tempHome;
  const code = main([
    "init",
    "--vault",
    tempVault,
    "--provider",
    "openai",
    "--api-key",
    "test-key"
  ]);

  assert.equal(code, 0);

  const keyPath = path.join(tempHome, ".ovl", "api_key.txt");
  const configPath = path.join(tempHome, ".ovl", "config.yaml");
  assert.equal(fs.existsSync(keyPath), true);
  assert.equal(fs.readFileSync(keyPath, "utf-8").trim(), "test-key");

  const configContent = fs.readFileSync(configPath, "utf-8");
  assert.match(configContent, new RegExp(`api_key_ref: "file:${keyPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`));

  process.env.HOME = originalHome;
});
