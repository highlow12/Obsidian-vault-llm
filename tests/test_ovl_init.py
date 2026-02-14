import os
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

import ovl


class OvlInitTest(unittest.TestCase):
    def test_init_creates_config_with_required_fields(self):
        with tempfile.TemporaryDirectory() as temp_home, tempfile.TemporaryDirectory() as temp_vault:
            with patch.dict(os.environ, {"HOME": temp_home}, clear=False):
                code = ovl.main(["init", "--vault", temp_vault, "--provider", "openai"])

            self.assertEqual(code, 0)
            config_path = Path(temp_home) / ".ovl" / "config.yaml"
            self.assertTrue(config_path.exists())
            content = config_path.read_text(encoding="utf-8")
            self.assertIn('vault_path: "', content)
            self.assertIn('provider: "openai"', content)
            self.assertIn("default_k: 8", content)

    def test_init_stores_api_key_as_file_reference(self):
        with tempfile.TemporaryDirectory() as temp_home, tempfile.TemporaryDirectory() as temp_vault:
            with patch.dict(os.environ, {"HOME": temp_home}, clear=False):
                code = ovl.main([
                    "init",
                    "--vault",
                    temp_vault,
                    "--provider",
                    "openai",
                    "--api-key",
                    "test-key",
                ])

            self.assertEqual(code, 0)
            key_path = Path(temp_home) / ".ovl" / "api_key.txt"
            config_path = Path(temp_home) / ".ovl" / "config.yaml"
            self.assertTrue(key_path.exists())
            self.assertEqual(key_path.read_text(encoding="utf-8").strip(), "test-key")
            config_content = config_path.read_text(encoding="utf-8")
            self.assertIn(f'api_key_ref: "file:{key_path}"', config_content)


if __name__ == "__main__":
    unittest.main()
