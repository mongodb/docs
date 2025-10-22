"""
Content Type Analysis for MongoDB Document Comparison

This module provides automatic content type detection and comparison strategy
selection for the MongoDB document comparison library. It analyzes input values
to determine the most appropriate comparison approach.

Key Features:
    1. Automatic content type detection (files, JSON, text, objects, arrays)
    2. Intelligent strategy selection (document vs text comparison)
    3. MongoDB-specific pattern recognition
    4. Heuristic-based JSON detection
"""

from __future__ import annotations

from pathlib import Path
from typing import Any
from dataclasses import dataclass

from .parser import resolve_expected_file_path
from .comparison import ComparisonOptions


@dataclass
class ContentAnalyzer:
    """
    Analyzes content types to determine the appropriate comparison strategy.

    This class implements automatic content detection to handle files, strings,
    objects, and arrays seamlessly.
    """

    @staticmethod
    def detect_type(value: Any) -> str:
        """
        Detect the content type of a value for comparison strategy selection.

        Args:
            value: The value to analyze

        Returns:
            str: Content type identifier
        """
        if isinstance(value, (str, Path)):
            # Only check for files if the string is reasonable length and looks like a file path
            if isinstance(value, str) and len(value) < 255 and not ("\n" in value or "\r" in value):
                # Only check for files if the string looks like a file path
                if "/" in value or value.endswith(('.txt', '.json', '.yaml', '.yml')):
                    try:
                        # Convert to Path for consistent handling
                        path_value = Path(value)
                        # Check if it's a file path that exists
                        if path_value.is_file():
                            return "file"

                        # Check for relative file paths that might exist in expected locations
                        resolved_path = resolve_expected_file_path(value)
                        if resolved_path and Path(resolved_path).is_file():
                            return "file"
                    except:
                        pass
            elif isinstance(value, Path):
                try:
                    if value.is_file():
                        return "file"
                except:
                    pass

            # Check for ellipsis patterns
            if "..." in str(value):
                return "pattern_string"

            # Check for multi-line text
            if "\n" in str(value) or "\r" in str(value):
                return "text_block"

            # Check if it looks like structured data
            if ContentAnalyzer._looks_like_json(str(value)):
                return "structured_string"

            return "plain_string"
        elif isinstance(value, (list, tuple)):
            return "array"
        elif isinstance(value, dict):
            return "object"
        else:
            return "primitive"

    @staticmethod
    def _looks_like_json(value: str) -> bool:
        """
        Heuristic to detect if a string looks like JSON or MongoDB syntax.

        Args:
            value: String to analyze

        Returns:
            bool: True if the string appears to contain structured data
        """
        value = value.strip()

        # Empty or very short strings are not structured
        if len(value) < 2:
            return False

        # Check for JSON-like patterns
        if (value.startswith('{') and value.endswith('}')) or \
           (value.startswith('[') and value.endswith(']')):
            return True

        # Check for MongoDB-specific patterns
        mongodb_patterns = [
            'ObjectId(',
            'datetime.datetime(',
            'InsertOne(',
            'UpdateOne(',
            'DeleteOne(',
            'ReplaceOne(',
            '$oid',
            '$date',
            '$binary',
            'ISODate(',
            'NumberLong(',
            'NumberDecimal(',
        ]

        # Check for ISO datetime pattern (e.g., "2023-01-15T10:30:00.123456Z")
        import re
        iso_datetime_pattern = r'^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z?$'
        if re.match(iso_datetime_pattern, value):
            return True

        return any(pattern in value for pattern in mongodb_patterns)

    @staticmethod
    def select_strategy(expected_type: str, actual_type: str, options: ComparisonOptions) -> str:
        """
        Select the appropriate comparison strategy based on content types.

        Args:
            expected_type: Content type of expected value
            actual_type: Content type of actual value
            options: Comparison options

        Returns:
            str: Strategy identifier
        """
        # File comparisons always use document strategy
        if expected_type == "file":
            return "document"

        # Pattern strings and structured strings use document strategy
        if expected_type in ["pattern_string", "structured_string"]:
            return "document"

        # Objects and arrays use document strategy
        if expected_type in ["object", "array"] or actual_type in ["object", "array"]:
            return "document"

        # Text blocks use text strategy
        if expected_type == "text_block":
            return "text"

        # Default to document strategy for maximum functionality
        return "document"
