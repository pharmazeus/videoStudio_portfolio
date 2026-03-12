#!/usr/bin/env python3
"""
Scan a repository for likely token-heavy files without reading file content.

The script reports top files by estimated token footprint based on byte size.
"""

from __future__ import annotations

import argparse
from pathlib import Path


DEFAULT_IGNORES = {
    ".git",
    ".next",
    ".nuxt",
    ".cache",
    "node_modules",
    "dist",
    "build",
    "coverage",
    "__pycache__",
    ".venv",
    "venv",
}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Find likely token hotspots by file size.")
    parser.add_argument("root", nargs="?", default=".", help="Root path to scan.")
    parser.add_argument("--top", type=int, default=25, help="Number of files to print.")
    parser.add_argument(
        "--include-hidden",
        action="store_true",
        help="Include hidden files and folders except ignored directories.",
    )
    return parser.parse_args()


def should_skip(path: Path, include_hidden: bool) -> bool:
    for part in path.parts:
        if part in DEFAULT_IGNORES:
            return True
        if not include_hidden and part.startswith("."):
            return True
    return False


def estimate_tokens(size_bytes: int) -> int:
    # Rough practical estimate: 1 token ~= 4 bytes for mixed source/doc text.
    return max(1, size_bytes // 4)


def collect_files(root: Path, include_hidden: bool) -> list[tuple[Path, int]]:
    results: list[tuple[Path, int]] = []
    for path in root.rglob("*"):
        if should_skip(path.relative_to(root), include_hidden):
            continue
        if not path.is_file():
            continue
        try:
            size = path.stat().st_size
        except OSError:
            continue
        results.append((path, size))
    return results


def main() -> int:
    args = parse_args()
    root = Path(args.root).resolve()
    if not root.exists():
        raise SystemExit(f"Path does not exist: {root}")
    if not root.is_dir():
        raise SystemExit(f"Path is not a directory: {root}")

    files = collect_files(root, include_hidden=args.include_hidden)
    ranked = sorted(files, key=lambda item: item[1], reverse=True)
    top = ranked[: max(1, args.top)]

    print(f"Root: {root}")
    print(f"Files scanned: {len(files)}")
    print("")
    print("Top token hotspots (rough estimate):")
    print("est_tokens  size_bytes  path")
    for path, size in top:
        rel = path.relative_to(root)
        print(f"{estimate_tokens(size):>10}  {size:>10}  {rel}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
