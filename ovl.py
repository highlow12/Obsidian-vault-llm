from __future__ import annotations

import argparse
import os
from pathlib import Path


def _yaml_quote(value: str) -> str:
    return '"' + value.replace('"', '\\"') + '"'


def _build_config(vault: Path, provider: str, api_key_ref: str | None) -> str:
    lines = [
        f"vault_path: {_yaml_quote(str(vault))}",
        f"provider: {_yaml_quote(provider)}",
        "default_k: 8",
        "chunk_size: 400",
        "filters: {}",
    ]
    if api_key_ref:
        lines.append(f"api_key_ref: {_yaml_quote(api_key_ref)}")
    return "\n".join(lines) + "\n"


def run_init(vault: str, provider: str, api_key: str | None) -> int:
    vault_path = Path(vault).expanduser().resolve()
    if not vault_path.exists() or not vault_path.is_dir():
        print("오류: 유효한 볼트 디렉터리를 입력해 주세요.")
        return 1

    config_dir = Path.home() / ".ovl"
    config_dir.mkdir(parents=True, exist_ok=True)

    api_key_ref = None
    if api_key:
        api_key_file = config_dir / "api_key.txt"
        fd = os.open(api_key_file, os.O_WRONLY | os.O_CREAT | os.O_TRUNC, 0o600)
        with os.fdopen(fd, "w", encoding="utf-8") as secure_file:
            secure_file.write(api_key + "\n")
        api_key_ref = f"file:{api_key_file}"

    config_content = _build_config(vault_path, provider, api_key_ref)
    config_path = config_dir / "config.yaml"
    config_path.write_text(config_content, encoding="utf-8")

    print(f"초기화 완료: {config_path}")
    return 0


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(prog="ovl")
    subparsers = parser.add_subparsers(dest="command", required=True)

    init_parser = subparsers.add_parser("init", help="볼트 및 기본 설정 초기화")
    init_parser.add_argument("--vault", required=True, help="Obsidian 볼트 경로")
    init_parser.add_argument(
        "--provider",
        default="openai",
        choices=["openai", "local"],
        help="LLM 제공자",
    )
    init_parser.add_argument("--api-key", help="LLM API 키")

    args = parser.parse_args(argv)

    if args.command == "init":
        return run_init(args.vault, args.provider, args.api_key)

    return 1


if __name__ == "__main__":
    raise SystemExit(main())
