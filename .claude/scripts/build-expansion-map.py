#!/usr/bin/env python3
"""Build the expansion map for a docset/version from its snooty.toml.

An expansion map is the {name: expanded_text} dict formed by merging a
snooty.toml's [constants] and [substitutions] tables. It is written as YAML
next to the snooty.toml so skills can read it directly instead of
re-parsing TOML on every run.

Usage: build-expansion-map.py <path-to-snooty.toml>
"""
import sys
import tomllib
from pathlib import Path

import yaml


def load_toml_map(snooty_toml: Path) -> dict[str, dict[str, str]]:
    with snooty_toml.open("rb") as f:
        data = tomllib.load(f)
    substitutions = {k: str(v) for k, v in data.get("substitutions", {}).items()}
    constants = {k: str(v) for k, v in data.get("constants", {}).items()}
    return {"substitutions": substitutions, "constants": constants}


def build_expansion_map(snooty_toml: Path) -> dict:
    toml_map = load_toml_map(snooty_toml)

    # Precedence for the flattened lookup: constants > substitutions.
    # Constants win because they also resolve inside roles and URLs, so
    # they are the more capable markup when a key exists in both (see
    # .github/prompts/source-constant-substitution-check.prompt.md).
    expanded = {**toml_map["substitutions"], **toml_map["constants"]}

    return {
        "source_snooty_toml": str(snooty_toml),
        "constants": toml_map["constants"],
        "substitutions": toml_map["substitutions"],
        "expanded": expanded,
    }


def main() -> int:
    if len(sys.argv) != 2:
        print("Usage: build-expansion-map.py <path-to-snooty.toml>", file=sys.stderr)
        return 1

    snooty_toml = Path(sys.argv[1]).resolve()
    if not snooty_toml.is_file():
        print(f"Not a file: {snooty_toml}", file=sys.stderr)
        return 1

    expansion_map = build_expansion_map(snooty_toml)
    out_path = snooty_toml.parent / ".expansion-map.yml"
    out_path.write_text(yaml.dump(expansion_map, sort_keys=True, default_flow_style=False))
    print(f"Wrote {out_path}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
