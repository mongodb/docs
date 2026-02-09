"""
Content Parser for MongoDB Code Example Validation

This module handles the complex task of parsing expected output content from MongoDB
code examples and converting it into normalized Python data structures suitable for
comparison. The parser is designed to handle the wide variety of formats that appear
in MongoDB documentation examples.

Key Design Challenges:
    1. Mixed Format Support: Examples may contain JSON, Python literals, MongoDB shell syntax
    2. MongoDB Type Extensions: ObjectId(), Date(), Binary() constructors need normalization
    3. PyMongo Result Objects: InsertOneResult, UpdateResult, etc. require special handling
    4. Comment Preservation: Must handle both // and /* */ style comments
    5. Flexible Quoting: Single quotes, double quotes, unquoted keys all valid
    6. Multi-format Detection: JSONL, multi-block, single objects all supported

Parser Architecture:
    The parsing process follows a multi-stage pipeline:
    1. Comment Removal: Strip // and /* */ comments while preserving string content
    2. Global Ellipsis Detection: Handle top-level "..." wildcards
    3. Quote Normalization: Convert single quotes and unquoted keys to valid JSON
    4. Constructor Replacement: Transform MongoDB/PyMongo types to Extended JSON
    5. Format Detection: Determine if content is array, object, or JSONL
    6. JSON Parsing: Standard JSON parsing with fallback to AST literal_eval
    7. Post-processing: Convert Extended JSON back to normalized Python objects

Design Philosophy:
    The parser prioritizes compatibility over strict validation:
    - Accept any reasonable input format from MongoDB examples
    - Normalize inconsistent representations to canonical forms
    - Provide helpful error messages when parsing fails
    - Preserve semantic meaning while standardizing syntax

Performance Considerations:
    - Precompiled regex patterns for expensive operations
    - Single-pass processing where possible
    - Early termination on format detection
    - Efficient parenthesis balancing for complex constructors

Maintainer Notes:
    When adding support for new MongoDB types or PyMongo result objects:
    1. Add regex pattern to module constants
    2. Implement constructor replacement in _replace_constructors_with_ejson
    3. Add post-processing logic in _postprocess
    4. Update tests to cover the new type patterns

    The parser is intentionally permissive - it's better to accept and normalize
    slightly malformed input than to reject valid MongoDB example output.
"""

from __future__ import annotations

import json
import ast
import re
from dataclasses import dataclass
from datetime import datetime, timezone
from typing import Any, Tuple

# Precompiled regex patterns for performance-critical parsing operations
# Design Decision: Pre-compilation avoids regex compilation overhead during parsing
# since these patterns are used repeatedly across many document comparisons

# Core JSON syntax patterns
_UNQUOTED_KEY_RE = re.compile(r"(^|\s|\{|,)(\$?[A-Za-z_][\w\-]*)\s*:", re.MULTILINE)

# MongoDB BSON type constructor patterns
# These handle MongoDB shell syntax like ObjectId("...") and convert to Extended JSON
_OBJECTID_RE = re.compile(r"ObjectId\((['\"]([^'\"]+)['\"]|\.\.\.)\)")
_DECIMAL128_RE = re.compile(r"Decimal128\((['\"]([^'\"]+)['\"]|\.\.\.)\)")
_DATE_RE = re.compile(r"Date\((['\"]([^'\"]+)['\"]|\.\.\.)\)")
_BINARY_RE = re.compile(r"Binary\((['\"]([^'\"]+)['\"]|\.\.\.),?\s*(\d+)?\)")
_COLLATION_RE = re.compile(r"Collation\(locale=['\"]([\w_]+)[\"']\)")
_UUID_RE = re.compile(r"UUID\((['\"]([^'\"]+)['\"]|\.\.\.)\)")

# PyMongo result object patterns
# These capture result objects from PyMongo operations and normalize them
_INSERT_ONE_RESULT_RE = re.compile(r"InsertOneResult\(([^)]+)\)")
_UPDATE_RESULT_RE = re.compile(r"UpdateResult\(([^)]+)\)")
_DELETE_RESULT_RE = re.compile(r"DeleteResult\(([^)]+)\)")
_BULK_WRITE_RESULT_RE = re.compile(r"BulkWriteResult\(([^)]+)\)")

# Python compatibility patterns for handling different Python versions/styles
_UNICODE_STRING_RE = re.compile(r"u'([^']*)'")  # Python 2 unicode literals
_BYTES_RE = re.compile(r"b'([^']*)'")  # Byte string literals
_DATETIME_RE = re.compile(r"datetime\.datetime\(([^)]+)\)")  # datetime constructors
_ISO_DATE_RE = re.compile(
    r"\b(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.?\d*Z?)\b"
)  # ISO date strings

# PyMongo operation patterns with improved handling for complex nested arguments
# Design Decision: These patterns focus on operation type detection, with argument
# parsing handled separately to avoid regex complexity with nested structures
_PYMONGO_INSERT_ONE_OP_RE = re.compile(
    r"(?:pymongo\.)?InsertOne\s*\(\s*(.+?)\s*\)(?=\s*[,\]\}]|$)", re.DOTALL
)
_PYMONGO_UPDATE_ONE_OP_RE = re.compile(
    r"(?:pymongo\.)?UpdateOne\s*\(\s*(.+?)\s*\)(?=\s*[,\]\}]|$)", re.DOTALL
)
_PYMONGO_UPDATE_MANY_OP_RE = re.compile(
    r"(?:pymongo\.)?UpdateMany\s*\(\s*(.+?)\s*\)(?=\s*[,\]\}]|$)", re.DOTALL
)
_PYMONGO_REPLACE_ONE_OP_RE = re.compile(
    r"(?:pymongo\.)?ReplaceOne\s*\(\s*(.+?)\s*\)(?=\s*[,\]\}]|$)", re.DOTALL
)
_PYMONGO_DELETE_ONE_OP_RE = re.compile(
    r"(?:pymongo\.)?DeleteOne\s*\(\s*(.+?)\s*\)(?=\s*[,\]\}]|$)", re.DOTALL
)
_PYMONGO_DELETE_MANY_OP_RE = re.compile(
    r"(?:pymongo\.)?DeleteMany\s*\(\s*(.+?)\s*\)(?=\s*[,\]\}]|$)", re.DOTALL
)


def _find_matching_parenthesis(text, start_pos):
    """
    Find the position of the matching closing parenthesis using balanced counting.

    This function is critical for parsing complex PyMongo constructor calls that may
    contain nested parentheses, quoted strings, and embedded objects. The algorithm
    correctly handles string literals to avoid counting parentheses inside quotes.

    Args:
        text (str): The text to search within
        start_pos (int): Position to start searching from (after opening parenthesis)

    Returns:
        int: Position of matching closing parenthesis, or -1 if not found

    Design Decision: String awareness is essential because MongoDB documents often
    contain quoted JSON that includes parentheses, brackets, and other punctuation
    that could confuse simple character counting.

    Example: ObjectId("...") vs UpdateOne({"field": "(value)"}, {"$set": {...}})
    """
    paren_count = 1  # Start with 1 since we're already inside the opening parenthesis
    in_string = False
    quote_char = None
    i = start_pos

    while i < len(text):
        char = text[i]

        if not in_string:
            if char in "\"'":
                in_string = True
                quote_char = char
            elif char == "(":
                paren_count += 1
            elif char == ")":
                paren_count -= 1
                if paren_count == 0:
                    return i
        else:
            # Handle escaped quotes inside strings
            if char == quote_char and (i == 0 or text[i - 1] != "\\"):
                in_string = False
                quote_char = None

        i += 1

    return -1  # No matching parenthesis found


def _extract_constructor_content(pattern, constructor_name, text):
    """
    Extract constructor content using balanced parenthesis matching.

    This function replaces simple regex matching for complex constructors where
    nested structures make regex-based parsing unreliable. It's specifically
    designed for PyMongo operations and index models that contain complex
    nested arguments.

    Args:
        pattern: Unused (kept for API compatibility)
        constructor_name (str): Name of constructor to find (e.g., "IndexModel")
        text (str): Text to search within

    Returns:
        List[Tuple]: List of (start_pos, end_pos, content, full_match) tuples

    Design Rationale: Complex PyMongo operations like UpdateOne can contain
    deeply nested filter and update documents. Simple regex patterns fail
    on these cases, leading to incorrect parsing and comparison failures.

    Example problematic input:
        UpdateOne({"nested": {"field": "value)"}}, {"$set": {"complex": {...}}})
    """
    import re

    # Find all potential matches
    matches = []
    start_pattern = f"(?:pymongo\\.)?{constructor_name}\\s*\\("

    for match in re.finditer(start_pattern, text):
        start_pos = match.end() - 1  # Position of opening parenthesis
        end_pos = _find_matching_parenthesis(text, start_pos + 1)

        if end_pos != -1:
            # Extract the content between parentheses
            content = text[start_pos + 1 : end_pos]
            full_match = text[match.start() : end_pos + 1]
            matches.append((match.start(), end_pos + 1, content, full_match))

    return matches


# Index model patterns for MongoDB Atlas Search and standard indexes
# Separate from operations because they have different argument structures
_PYMONGO_SEARCH_INDEX_MODEL_RE = re.compile(
    r"(?:pymongo\.)?SearchIndexModel\s*\(\s*(.+?)\s*\)", re.DOTALL
)
_PYMONGO_INDEX_MODEL_RE = re.compile(
    r"(?:pymongo\.)?IndexModel\s*\(\s*(.+?)\s*\)", re.DOTALL
)


@dataclass
class ParseResult:
    """
    Container for parsed content with metadata about parsing decisions.

    Attributes:
        value (Any): The parsed and normalized Python object
        has_global_ellipsis (bool): Whether top-level "..." wildcard was detected

    Design Decision: Separate the parsed value from parsing metadata to allow
    callers to handle global ellipsis patterns appropriately. Global ellipsis
    affects how comparison algorithms are selected and applied.
    """

    value: Any
    has_global_ellipsis: bool


def _remove_comments(content: str) -> str:
    """
    Remove // and /* */ style comments while preserving content inside strings.

    This function handles both single-line (//) and multi-line (/* */) comments
    commonly found in MongoDB shell output and example code. The key challenge
    is distinguishing comments from similar-looking content inside quoted strings.

    Args:
        content (str): Raw content that may contain comments

    Returns:
        str: Content with comments removed

    Algorithm Design:
        Uses state machine approach to track whether we're inside a string literal.
        This prevents accidentally removing comment-like sequences that are actually
        part of string values (e.g., URLs, regex patterns, JSON strings).

    Example transformations:
        'db.find() // this is a comment' -> 'db.find() '
        '{"url": "http://example.com"}' -> '{"url": "http://example.com"}' (unchanged)
        '/* multi-line comment */' -> ''

    Edge Cases Handled:
        - Escaped quotes inside strings (\\" and \\')
        - Mixed quote types (single and double quotes)
        - Unclosed multi-line comments (stops at end of input)
        - Comment markers inside string literals (preserved)
    """
    result = []
    i = 0
    n = len(content)
    in_single_quote = False
    in_double_quote = False

    while i < n:
        ch = content[i]
        next_ch = content[i + 1] if i + 1 < n else ""

        # Handle escape sequences
        if ch == "\\":
            # Preserve escape sequence and skip next character
            result.append(ch)
            if i + 1 < n:
                result.append(content[i + 1])
                i += 2
                continue

        # Track string boundaries
        if ch == '"' and not in_single_quote:
            in_double_quote = not in_double_quote
            result.append(ch)
            i += 1
            continue
        if ch == "'" and not in_double_quote:
            in_single_quote = not in_single_quote
            result.append(ch)
            i += 1
            continue

        # Process comments only when not inside strings
        if not in_single_quote and not in_double_quote:
            if ch == "/" and next_ch == "/":
                # Single-line comment: skip to end of line
                i += 2
                while i < n and content[i] not in "\r\n":
                    i += 1
                continue
            if ch == "/" and next_ch == "*":
                # Multi-line comment: skip to closing */
                i += 2
                while i + 1 < n and not (content[i] == "*" and content[i + 1] == "/"):
                    i += 1
                if i + 1 < n and content[i] == "*" and content[i + 1] == "/":
                    i += 2
                # If unclosed comment, just break (end of input)
                continue

        # Regular character - add to result
        result.append(ch)
        i += 1

    return "".join(result)


def _detect_and_strip_global_ellipsis(content: str) -> tuple[str, bool]:
    """
    Detect and remove global ellipsis markers from content.

    Global ellipsis markers are standalone "..." lines that appear OUTSIDE of
    documents (i.e., between documents or at the start/end of the file).
    This is different from property-level ellipsis patterns which appear
    INSIDE documents and indicate omitted fields.

    Args:
        content (str): Raw content to process

    Returns:
        tuple[str, bool]: (content_without_ellipsis, has_global_ellipsis)

    Design Decision: Global ellipsis is detected by finding standalone "..."
    lines that are outside of any document (brace/bracket count is zero).
    Ellipsis inside documents should be preserved and converted to "...": "..."
    to indicate omitted fields.

    Impact on Comparison: When global ellipsis is detected, the comparison
    engine treats the entire expected content as a wildcard, bypassing all
    structural validation.
    """
    lines = content.splitlines()
    has_global = False
    kept_lines = []
    brace_count = 0
    bracket_count = 0

    for line in lines:
        stripped = line.strip()

        # Count braces and brackets for this line (before processing)
        # to determine if we're inside a document
        for char in line:
            if char == '{':
                brace_count += 1
            elif char == '}':
                brace_count -= 1
            elif char == '[':
                bracket_count += 1
            elif char == ']':
                bracket_count -= 1

        # Check if this is a standalone ellipsis line
        if stripped == "...":
            # Determine if we're inside a document
            # Check if the counts are both 0 AFTER processing
            # If they're 0, we're at document boundary, so it's global ellipsis
            # If not 0, we're inside a document, so it's field-level ellipsis
            if brace_count == 0 and bracket_count == 0:
                # Global ellipsis - strip it and mark
                has_global = True
            else:
                # Inside a document - keep it (will be converted to "...": "...")
                kept_lines.append(line)
        else:
            kept_lines.append(line)

    return ("\n".join(kept_lines), has_global)


def _convert_single_to_double_quotes(s: str) -> str:
    # Convert single-quoted string literals to double-quoted, skipping those inside existing double-quoted contexts
    out = []
    i = 0
    n = len(s)
    in_d = False
    in_s = False
    while i < n:
        ch = s[i]
        if ch == "\\":
            out.append(ch)
            if i + 1 < n:
                out.append(s[i + 1])
                i += 2
                continue
        if ch == '"' and not in_s:
            in_d = not in_d
            out.append(ch)
            i += 1
            continue
        if ch == "'" and not in_d:
            # toggle single quote string and output double quote
            in_s = not in_s
            out.append('"')
            i += 1
            continue
        if in_s and ch == '"':
            # escape quotes inside converted single-quote string
            out.append('\\"')
            i += 1
            continue
        out.append(ch)
        i += 1
    return "".join(out)


def _quote_unquoted_keys(s: str) -> str:
    return _UNQUOTED_KEY_RE.sub(r'\1"\2":', s)


def _quote_unquoted_ellipsis(s: str) -> str:
    """
    Quote unquoted ellipsis (...) that appear as property values or array elements.

    This function is string-aware and will NOT modify ellipsis that appear inside
    quoted strings (e.g., a plot description ending with "...").

    Handles two patterns:
    1. Property values: { key: ... } becomes { key: "..." }
    2. Array elements: [item, ...] becomes [item, "..."]

    This aligns with mongosh commit 67d16af07bc and C# commit ddd298d9877.

    Args:
        s (str): Input string (after quote conversion)

    Returns:
        str: String with unquoted ellipsis converted to quoted strings

    Design Decision: Must be called after single-to-double quote conversion but
    before JSON parsing to prevent Python's ast.literal_eval from interpreting
    unquoted ... as the Ellipsis object.
    """
    result = []
    i = 0
    in_string = False

    while i < len(s):
        char = s[i]

        # Track whether we're inside a string
        if char == '"' and (i == 0 or s[i - 1] != '\\'):
            in_string = not in_string
            result.append(char)
            i += 1
        elif char == '.' and not in_string and s[i:i+3] == '...':
            # Found potential ellipsis outside a string
            # Check if this is an unquoted ellipsis that needs quoting
            # Look ahead to see what follows the ellipsis
            after_ellipsis = s[i+3:i+4] if i+3 < len(s) else ''

            # Check if followed by delimiter (whitespace, comma, closing brace/bracket)
            if after_ellipsis in ('', ' ', '\t', '\n', '\r', ',', '}', ']'):
                # This is an unquoted ellipsis - quote it
                result.append('"..."')
                i += 3
            else:
                # Not a standalone ellipsis, just copy the dot
                result.append(char)
                i += 1
        else:
            result.append(char)
            i += 1

    return ''.join(result)


def _convert_standalone_ellipsis_to_field(s: str) -> str:
    """
    Convert standalone "..." on its own line to "...": "..." for omitted fields marker.

    This enables support for patterns like:
        { ok: 1, ... }
    where `...` at the end of a document indicates more fields may exist.

    After _quote_unquoted_ellipsis runs, the ... becomes "...". This function
    then converts a standalone "..." on its own line (inside an OBJECT, not array) to
    the key-value pair "...": "..." which the comparison engine recognizes
    as an omitted fields marker.

    IMPORTANT: This should NOT convert "..." inside arrays, as that's array-level
    ellipsis which should remain as a simple string value.

    Args:
        s (str): Input string (after _quote_unquoted_ellipsis)

    Returns:
        str: String with standalone "..." in objects converted to "...": "..."
    """
    lines = s.splitlines(keepends=True)
    result = []
    brace_count = 0
    bracket_count = 0

    for line in lines:
        stripped = line.strip()

        # Check if this is a standalone "..." line BEFORE updating counts
        is_standalone_ellipsis = stripped == '"..."' or stripped == '"...",'

        # Determine if we're inside an object (brace_count > bracket_count means
        # the innermost container is an object, not an array)
        # We need to check the context BEFORE this line
        inside_object = brace_count > 0 and brace_count > bracket_count

        # Update counts for this line
        in_string = False
        for char in line:
            if char == '"':
                in_string = not in_string
            elif not in_string:
                if char == '{':
                    brace_count += 1
                elif char == '}':
                    brace_count -= 1
                elif char == '[':
                    bracket_count += 1
                elif char == ']':
                    bracket_count -= 1

        # Convert standalone "..." to "...": "..." only if inside an object
        if is_standalone_ellipsis and inside_object:
            # Preserve leading whitespace and trailing comma if present
            leading_ws = line[:len(line) - len(line.lstrip())]
            has_comma = stripped.endswith(',')
            if has_comma:
                result.append(f'{leading_ws}"...": "...",\n')
            else:
                result.append(f'{leading_ws}"...": "..."\n')
        else:
            result.append(line)

    return ''.join(result)


def _remove_trailing_commas(s: str) -> str:
    """
    Remove trailing commas for valid JSON.

    Handles cases like:
        { "ok": 1, } -> { "ok": 1 }
        [ "item", ] -> [ "item" ]

    Args:
        s (str): Input string

    Returns:
        str: String with trailing commas removed
    """
    # Remove trailing commas before }
    s = re.sub(r',(\s*)\}', r'\1}', s)
    # Remove trailing commas before ]
    s = re.sub(r',(\s*)\]', r'\1]', s)
    return s


def _quote_unquoted_iso_dates(s: str) -> str:
    # Add quotes around ISO date tokens appearing after a colon if not already quoted
    def repl(m: re.Match) -> str:
        token = m.group(1)
        return token  # already matched as a standalone token; quoting done below universally

    # For simplicity, rely on general replacement later; leave as-is
    return s


def _replace_constructors_with_ejson(s: str) -> str:
    # Handle MongoDB BSON types
    s = _OBJECTID_RE.sub(
        lambda m: (
            '{"$oid": "..."}'
            if m.group(1) == "..."
            else '{"$oid": "%s"}' % (m.group(2) or "")
        ),
        s,
    )
    s = _DECIMAL128_RE.sub(
        lambda m: (
            '{"$numberDecimal": "..."}'
            if m.group(1) == "..."
            else '{"$numberDecimal": "%s"}' % (m.group(2) or "")
        ),
        s,
    )
    s = _DATE_RE.sub(
        lambda m: (
            '{"$date": "..."}'
            if m.group(1) == "..."
            else '{"$date": "%s"}' % (m.group(2) or "")
        ),
        s,
    )
    s = _BINARY_RE.sub(
        lambda m: (
            '{"$binary": {"base64": "...", "subType": "%s"}}' % (m.group(3) or "0")
            if m.group(1) == "..."
            else '{"$binary": {"base64": "%s", "subType": "%s"}}'
            % (m.group(2) or "", m.group(3) or "0")
        ),
        s,
    )
    s = _COLLATION_RE.sub(lambda m: '{"$collation": {"locale": "%s"}}' % m.group(1), s)
    s = _UUID_RE.sub(
        lambda m: (
            '{"$uuid": "..."}'
            if m.group(1) == "..."
            else '{"$uuid": "%s"}' % (m.group(2) or "")
        ),
        s,
    )

    # Handle PyMongo result objects
    s = _INSERT_ONE_RESULT_RE.sub(
        lambda m: '{"$insertOneResult": {%s}}' % m.group(1), s
    )
    s = _UPDATE_RESULT_RE.sub(lambda m: '{"$updateResult": {%s}}' % m.group(1), s)
    s = _DELETE_RESULT_RE.sub(lambda m: '{"$deleteResult": {%s}}' % m.group(1), s)
    s = _BULK_WRITE_RESULT_RE.sub(
        lambda m: '{"$bulkWriteResult": {%s}}' % m.group(1), s
    )

    # Handle Python 2/3 compatibility
    s = _UNICODE_STRING_RE.sub(lambda m: '"%s"' % m.group(1), s)
    s = _BYTES_RE.sub(lambda m: '{"$bytes": "%s"}' % m.group(1), s)

    # Handle datetime.datetime constructors
    def datetime_replacer(m):
        args = m.group(1).strip()
        # Parse the datetime arguments and convert to ISO string
        try:
            # Handle datetime.datetime(year, month, day, hour, minute, second[, microsecond])
            parts = [p.strip() for p in args.split(",")]
            if len(parts) >= 3:
                year = int(parts[0])
                month = int(parts[1])
                day = int(parts[2])
                hour = int(parts[3]) if len(parts) > 3 else 0
                minute = int(parts[4]) if len(parts) > 4 else 0
                second = int(parts[5]) if len(parts) > 5 else 0
                microsecond = int(parts[6]) if len(parts) > 6 else 0

                dt = datetime(
                    year, month, day, hour, minute, second, microsecond, timezone.utc
                )
                iso_string = (
                    dt.strftime("%Y-%m-%dT%H:%M:%S.%f")[:-3] + "Z"
                )  # millisecond precision
                return '{"$datetime": "%s"}' % iso_string
        except (ValueError, IndexError):
            pass
        # Fallback: preserve as placeholder
        return '{"$datetime": "invalid"}'

    s = _DATETIME_RE.sub(datetime_replacer, s)

    # Handle PyMongo operations objects
    def _parse_operation_args(args_str, op_type=None):
        """Parse operation arguments, handling both named and positional parameters."""
        result = {}
        args_str = args_str.strip()

        if not args_str:
            return result

        # Split arguments by commas that are not inside braces/brackets/parens
        arg_parts = []
        current_part = ""
        brace_count = 0
        paren_count = 0
        bracket_count = 0
        in_string = False
        escape_next = False
        quote_char = None

        for char in args_str:
            if escape_next:
                escape_next = False
                current_part += char
                continue

            if char == "\\":
                escape_next = True
                current_part += char
                continue

            if not in_string:
                if char in "\"'":
                    in_string = True
                    quote_char = char
                elif char == "{":
                    brace_count += 1
                elif char == "}":
                    brace_count -= 1
                elif char == "(":
                    paren_count += 1
                elif char == ")":
                    paren_count -= 1
                elif char == "[":
                    bracket_count += 1
                elif char == "]":
                    bracket_count -= 1
                elif (
                    char == ","
                    and brace_count == 0
                    and paren_count == 0
                    and bracket_count == 0
                ):
                    arg_parts.append(current_part.strip())
                    current_part = ""
                    continue
            else:
                if char == quote_char:
                    in_string = False
                    quote_char = None

            current_part += char

        if current_part.strip():
            arg_parts.append(current_part.strip())

        # Process each argument part
        positional_count = 0

        # Define positional parameter names based on operation type
        if op_type == "InsertOne":
            positional_names = ["document"]
        elif op_type in ["UpdateOne", "UpdateMany"]:
            positional_names = ["filter", "update"]
        elif op_type == "ReplaceOne":
            positional_names = ["filter", "replacement"]
        elif op_type in ["DeleteOne", "DeleteMany"]:
            positional_names = ["filter"]
        else:
            # Fallback for unknown operation types
            positional_names = [
                "document",
                "filter",
                "update",
                "replacement",
                "pipeline",
            ]

        for part in arg_parts:
            part = part.strip()
            if not part:
                continue

            # Check if this is a named parameter (key=value)
            equal_pos = part.find("=")
            is_named_param = False

            if equal_pos != -1:
                # Check if the '=' is inside braces (not a parameter assignment)
                open_braces = 0
                is_named_param = True
                for j in range(equal_pos):
                    if part[j] in "{[(":
                        open_braces += 1
                    elif part[j] in "}])":
                        open_braces -= 1

                if open_braces > 0:
                    # The '=' is inside braces, not a parameter assignment
                    is_named_param = False

            if is_named_param:
                # Named parameter
                key = part[:equal_pos].strip()
                value = part[equal_pos + 1 :].strip()
            else:
                # Positional parameter - assign a reasonable name
                if positional_count < len(positional_names):
                    key = positional_names[positional_count]
                else:
                    key = f"arg{positional_count}"
                value = part
                positional_count += 1

            # Try to parse value as JSON, then as Python literal
            try:
                parsed_value = json.loads(value)
                result[key] = parsed_value
            except:
                # If JSON parsing fails, try Python literal evaluation
                try:
                    import ast

                    parsed_value = ast.literal_eval(value)
                    result[key] = parsed_value
                except:
                    # If both fail, keep as string but try to clean it up
                    if value.startswith('"') and value.endswith('"'):
                        result[key] = value[1:-1]
                    else:
                        result[key] = value

        return result

    def create_operation_placeholder(op_type, args_str):
        """Create a placeholder object for a PyMongo operation."""
        parsed_args = _parse_operation_args(args_str, op_type)
        result = {"$operation": op_type}
        result.update(parsed_args)
        return json.dumps(result)

    def create_index_model_placeholder(model_type, args_str):
        """Create a placeholder object for a PyMongo index model."""
        parsed_args = _parse_operation_args(args_str, model_type)
        result = {"$indexModel": model_type}

        # For SearchIndexModel and IndexModel, arguments are typically: definition, name, type (optional)
        # No special mapping needed - the parsed args should be correct
        result.update(parsed_args)
        return json.dumps(result)

    # Replace PyMongo operations
    s = _PYMONGO_INSERT_ONE_OP_RE.sub(
        lambda m: create_operation_placeholder("InsertOne", m.group(1)), s
    )
    s = _PYMONGO_UPDATE_ONE_OP_RE.sub(
        lambda m: create_operation_placeholder("UpdateOne", m.group(1)), s
    )
    s = _PYMONGO_UPDATE_MANY_OP_RE.sub(
        lambda m: create_operation_placeholder("UpdateMany", m.group(1)), s
    )
    s = _PYMONGO_REPLACE_ONE_OP_RE.sub(
        lambda m: create_operation_placeholder("ReplaceOne", m.group(1)), s
    )
    s = _PYMONGO_DELETE_ONE_OP_RE.sub(
        lambda m: create_operation_placeholder("DeleteOne", m.group(1)), s
    )
    s = _PYMONGO_DELETE_MANY_OP_RE.sub(
        lambda m: create_operation_placeholder("DeleteMany", m.group(1)), s
    )

    # Replace PyMongo index models using balanced parenthesis matching
    # SearchIndexModel
    search_matches = _extract_constructor_content(None, "SearchIndexModel", s)
    for start, end, content, full_match in reversed(
        search_matches
    ):  # Process from end to start to maintain positions
        replacement = create_index_model_placeholder("SearchIndexModel", content)
        s = s[:start] + replacement + s[end:]

    # IndexModel
    index_matches = _extract_constructor_content(None, "IndexModel", s)
    for start, end, content, full_match in reversed(
        index_matches
    ):  # Process from end to start to maintain positions
        replacement = create_index_model_placeholder("IndexModel", content)
        s = s[:start] + replacement + s[end:]

    return s


def _wrap_as_array_if_jsonl_or_multiblock(content: str) -> str:
    trimmed = content.strip()
    if not trimmed:
        return "[]"
    # detect JSON array
    if trimmed.startswith("[") and trimmed.endswith("]"):
        return trimmed
    # detect JSONL (multiple object lines)
    lines = [ln.strip() for ln in trimmed.splitlines() if ln.strip()]
    if len(lines) > 1 and all(ln.startswith("{") and ln.endswith("}") for ln in lines):
        return "[" + ",".join(lines) + "]"
    # else leave as-is; if it's a single object, OK. If multi-block separated by blank lines, join with commas
    blocks = [blk.strip() for blk in re.split(r"\n\s*\n", trimmed)]
    # Only treat as multiblock if all blocks are complete JSON objects
    valid_blocks = [
        blk for blk in blocks if blk and blk.startswith("{") and blk.endswith("}")
    ]
    if len(valid_blocks) == len(blocks) and len(valid_blocks) > 1:
        return "[" + ",".join(valid_blocks) + "]"
    return trimmed


def _postprocess(node: Any) -> Any:
    if isinstance(node, dict):
        # extended JSON
        if set(node.keys()) == {"$oid"}:
            v = node["$oid"]
            return "..." if v == "..." else str(v)
        if set(node.keys()) == {"$numberDecimal"}:
            v = node["$numberDecimal"]
            return "..." if v == "..." else str(v)
        if set(node.keys()) == {"$date"}:
            v = node["$date"]
            if v == "...":
                return "..."
            # try parse date
            try:
                dt = datetime.fromisoformat(v.replace("Z", "+00:00"))
                dt = dt.astimezone(timezone.utc)
                return dt.strftime("%Y-%m-%dT%H:%M:%S.%f")[:-3] + "Z"
            except Exception:
                return v
        if set(node.keys()) == {"$binary"}:
            if isinstance(node["$binary"], dict):
                base64_data = node["$binary"].get("base64", "")
                return "..." if base64_data == "..." else {"$binary": node["$binary"]}
            return "..." if node["$binary"] == "..." else node["$binary"]
        if set(node.keys()) == {"$uuid"}:
            v = node["$uuid"]
            return "..." if v == "..." else str(v)
        if set(node.keys()) == {"$collation"}:
            return node["$collation"]
        if set(node.keys()) == {"$bytes"}:
            v = node["$bytes"]
            return {"$bytes": v}
        if set(node.keys()) == {"$datetime"}:
            v = node["$datetime"]
            if v == "invalid":
                return "..."  # Fallback for unparseable datetime
            return v  # Return the ISO string directly
        # PyMongo result objects - normalize to essential data
        if set(node.keys()) == {"$insertOneResult"}:
            return {"inserted_id": node["$insertOneResult"].get("inserted_id", "...")}
        if set(node.keys()) == {"$updateResult"}:
            result = node["$updateResult"]
            return {
                "matched_count": result.get("matched_count", 0),
                "modified_count": result.get("modified_count", 0),
                "upserted_id": result.get("upserted_id"),
            }
        if set(node.keys()) == {"$deleteResult"}:
            return {"deleted_count": node["$deleteResult"].get("deleted_count", 0)}
        if set(node.keys()) == {"$bulkWriteResult"}:
            return node["$bulkWriteResult"]  # Keep full structure for bulk results
        # PyMongo operations objects - normalize to structured representation
        if "$operation" in node:
            op_type = node["$operation"]
            result = {"operation_type": op_type}

            # Add namespace if present
            if "namespace" in node:
                result["namespace"] = node["namespace"]

            # Add operation-specific parameters
            if op_type == "InsertOne":
                if "document" in node:
                    result["document"] = node["document"]
                elif (
                    "filter" in node
                ):  # Positional argument mapped to filter, should be document
                    result["document"] = node["filter"]
                elif "_main" in node:
                    result["document"] = node["_main"]
            elif op_type in ["UpdateOne", "UpdateMany"]:
                if "filter" in node:
                    result["filter"] = node["filter"]
                if "update" in node:
                    result["update"] = node["update"]
                elif "_main" in node:
                    # Assume it's the filter if no explicit parameters
                    result["filter"] = node["_main"]
            elif op_type == "ReplaceOne":
                if "filter" in node:
                    result["filter"] = node["filter"]
                if "replacement" in node:
                    result["replacement"] = node["replacement"]
                elif "_main" in node:
                    result["filter"] = node["_main"]
            elif op_type in ["DeleteOne", "DeleteMany"]:
                if "filter" in node:
                    result["filter"] = node["filter"]
                elif "_main" in node:
                    result["filter"] = node["_main"]

            return result

        # PyMongo index models - normalize to structured representation
        if "$indexModel" in node:
            model_type = node["$indexModel"]
            result = {"model_type": model_type}

            # Add common index model parameters
            if "definition" in node:
                result["definition"] = node["definition"]
            if "name" in node:
                result["name"] = node["name"]
            if "type" in node:
                result["type"] = node["type"]
            # Add any other parameters present
            for key, value in node.items():
                if key not in ["$indexModel", "definition", "name", "type"]:
                    result[key] = value

            return result

        # object-level ellipsis pattern {"...": "..."}
        if set(node.keys()) == {"..."} and node.get("...") == "...":
            return {"...": "..."}
        return {k: _postprocess(v) for k, v in node.items()}
    if isinstance(node, list):
        return [_postprocess(x) for x in node]
    if isinstance(node, bytes):
        return {"$bytes": node.decode("utf-8")}
    return node


def parse_expected_content(content: str) -> Tuple[Any, bool]:
    # strip comments and detect global ellipsis first
    content_no_comments = _remove_comments(content)
    content_no_ellipsis, has_global = _detect_and_strip_global_ellipsis(
        content_no_comments
    )
    s = _quote_unquoted_keys(content_no_ellipsis)
    s = _convert_single_to_double_quotes(s)
    # Quote unquoted ellipsis BEFORE parsing to prevent ast.literal_eval from
    # interpreting ... as Python's Ellipsis object. This must be done after
    # quote conversion so we can properly detect string boundaries.
    s = _quote_unquoted_ellipsis(s)
    # Convert standalone "..." on its own line to "...": "..." for omitted fields marker
    s = _convert_standalone_ellipsis_to_field(s)
    s = _quote_unquoted_iso_dates(s)
    s = _replace_constructors_with_ejson(s)
    # Remove trailing commas for valid JSON
    s = _remove_trailing_commas(s)
    s = _wrap_as_array_if_jsonl_or_multiblock(s)
    try:
        data = json.loads(s)
    except json.JSONDecodeError as ex:
        # try to wrap lone object
        try:
            data = ast.literal_eval(s)
        except Exception as ex:
            raise ValueError(f"Could not parse content as JSON or Python literal: {ex}")
    value = _postprocess(data)
    return value, has_global


def read_expected_file(file_path: str) -> str:
    with open(file_path, "r", encoding="utf-8") as f:
        return f.read()


def resolve_expected_file_path(relative_path: str) -> str:
    # Simple path resolution per spec; try common locations relative to this package
    from pathlib import Path

    base = Path(__file__).resolve().parents[3]  # project root: pymongo/
    candidates = [
        base / "examples" / relative_path,
        base.parent / "examples" / relative_path,
        base / relative_path,
        Path(relative_path),
    ]
    for p in candidates:
        if p.exists():
            return str(p)
    return relative_path


def is_potential_file_path(data: Any) -> bool:
    """
    Check if data could be a file path (single-line string without newlines).

    This is a heuristic check: strings containing newlines are unlikely to be
    file paths and are more likely to be multiline content.

    Args:
        data: The data to check

    Returns:
        True if data is a string that could be a file path
    """
    return isinstance(data, str) and "\n" not in data and "\r" not in data


def try_resolve_and_read_file(data: str) -> Tuple[str, bool]:
    """
    Attempt to resolve a string as a file path and read its contents.

    Args:
        data: A string that may be a file path

    Returns:
        Tuple of (content, success):
            - If successful: (file_content, True)
            - If not a valid file: (original_data, False)
    """
    from pathlib import Path

    try:
        resolved_path = resolve_expected_file_path(data)
        if resolved_path and Path(resolved_path).is_file():
            content = read_expected_file(resolved_path)
            return content, True
    except Exception:
        pass

    return data, False
