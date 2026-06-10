"""
kernel_bridge.py — Synchronous bridge to the comparison-kernel binary.

The kernel is a native Go binary, one per supported platform, committed under
``tools/comparison-kernel/bin/``.  This bridge spawns the binary matching the
host OS/arch as a child process and communicates over the newline-delimited
JSON protocol::

    → one JSON request object per line written to the process's stdin
    ← one JSON response object per line read from the process's stdout

No runtime dependency is required — the binary runs directly.
"""

from __future__ import annotations

import json
import platform
import subprocess
import sys
from pathlib import Path
from typing import Any, Dict, List, Optional

#: Wire-protocol version this bridge speaks. Must match the kernel's.
PROTOCOL_VERSION = 1


# Map Python's sys.platform / platform.machine() onto Go's GOOS / GOARCH naming.
_GOOS_MAP = {"darwin": "darwin", "linux": "linux", "win32": "windows"}
_GOARCH_MAP = {
    "arm64": "arm64",
    "aarch64": "arm64",
    "x86_64": "amd64",
    "amd64": "amd64",
}


def _resolve_kernel_binary() -> str:
    """Return the absolute path of the kernel binary for the current host."""
    goos = _GOOS_MAP.get(sys.platform)
    goarch = _GOARCH_MAP.get(platform.machine().lower())
    if not goos or not goarch:
        raise RuntimeError(
            f"comparison-kernel: unsupported host platform "
            f"{sys.platform}/{platform.machine()}. "
            "Add a target to tools/comparison-kernel/build.sh and rebuild."
        )
    suffix = ".exe" if goos == "windows" else ""
    binary_name = f"comparison-kernel-{goos}-{goarch}{suffix}"

    current = Path(__file__).resolve().parent
    for _ in range(12):
        candidate = current / "tools" / "comparison-kernel" / "bin" / binary_name
        if candidate.exists():
            return str(candidate)
        parent = current.parent
        if parent == current:
            break
        current = parent
    raise FileNotFoundError(
        f"{binary_name} not found. Build it with: ./build.sh in "
        "code-example-tests/tools/comparison-kernel"
    )


def _normalize_for_wire(value: Any) -> Any:
    """
    Recursively turn PyMongo/BSON types into JSON-serialisable equivalents
    the kernel knows how to consume:

      * ``datetime`` → ``{"$date": <iso>}`` (kernel collapses this to a string)
      * ``bson.Int64`` / ``bson.Int32`` → ``int(value)``
      * ``bson.ObjectId`` / ``bson.Decimal128`` / other bson scalars → ``str(value)``
      * ``bytes`` → hex string (so comparisons against expected hex literals work)
      * lists / dicts → walked recursively
      * everything else → passed through unchanged
    """
    from datetime import datetime

    if isinstance(value, datetime):
        return {"$date": value.isoformat()}
    if isinstance(value, bytes):
        return value.hex()
    if isinstance(value, list):
        return [_normalize_for_wire(v) for v in value]
    if isinstance(value, tuple):
        return [_normalize_for_wire(v) for v in value]
    if isinstance(value, dict):
        return {k: _normalize_for_wire(v) for k, v in value.items()}
    module = value.__class__.__module__
    if module.startswith("bson"):
        # BSON integer wrappers (Int32, Int64) carry numeric semantics; keeping
        # them as ints lets the kernel compare them against plain JSON numbers.
        cls_name = value.__class__.__name__
        if cls_name in ("Int64", "Int32") or isinstance(value, int) and not isinstance(value, bool):
            return int(value)
        return str(value)
    return value


def _serialize_actual(actual: Any) -> List[Any]:
    """
    Normalise *actual* into a JSON-serialisable list for the kernel's
    ``actual`` wire field. Single values are wrapped so the kernel always
    receives a document list.
    """
    if actual is None:
        return [None]
    normalized = _normalize_for_wire(actual)
    return normalized if isinstance(normalized, list) else [normalized]


def kernel_compare(
    expected_content: str,
    actual: Any,
    comparison_type: Optional[str] = None,
    ignore_field_values: Optional[List[str]] = None,
    schema: Optional[Dict[str, Any]] = None,
) -> Dict[str, Any]:
    """
    Send a synchronous comparison request to the kernel.

    Parameters
    ----------
    expected_content:
        Raw text of the expected output content.
    actual:
        Actual results from the test. Wrapped in a JSON array if necessary.
    comparison_type:
        ``"ordered"`` or ``None`` (kernel default: unordered).
    ignore_field_values:
        Field names whose values should be ignored during comparison.
    schema:
        Optional schema for ``shouldResemble``-style validation.

    Returns
    -------
    dict
        ``{"isMatch": bool, "errors": [...]}``
    """
    binary_path = _resolve_kernel_binary()
    actual_payload = _serialize_actual(actual)

    options: Dict[str, Any] = {}
    if comparison_type:
        options["comparisonType"] = comparison_type
    if ignore_field_values:
        options["ignoreFieldValues"] = ignore_field_values
    if schema is not None:
        options["schema"] = schema

    request = json.dumps(
        {
            "protocolVersion": PROTOCOL_VERSION,
            "expected": expected_content,
            "actual": actual_payload,
            "options": options,
        }
    )

    try:
        result = subprocess.run(
            [binary_path],
            input=request + "\n",
            capture_output=True,
            text=True,
            timeout=30,
        )
    except FileNotFoundError:
        raise RuntimeError(
            f"comparison-kernel binary not found at {binary_path}. "
            "Build it with: ./build.sh in code-example-tests/tools/comparison-kernel"
        )
    except subprocess.TimeoutExpired:
        raise RuntimeError("comparison-kernel timed out after 30 seconds")

    if result.returncode != 0:
        raise RuntimeError(
            f"comparison-kernel exited with code {result.returncode}: "
            f"{result.stderr.strip()}"
        )

    line = result.stdout.strip()
    if not line:
        raise RuntimeError("comparison-kernel returned empty response")

    return json.loads(line)
