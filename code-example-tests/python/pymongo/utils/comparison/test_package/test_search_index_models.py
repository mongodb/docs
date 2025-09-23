"""
Unit tests for SearchIndexModel and IndexModel parsing functionality.
"""

import unittest
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

try:
    from utils.comparison.assert_helpers import ComparisonTestCase
    from utils.comparison.comparison import ComparisonOptions
except ImportError:
    # Fallback for direct execution
    import sys

    sys.path.append("../../")
    from utils.comparison.assert_helpers import ComparisonTestCase
    from utils.comparison.comparison import ComparisonOptions


class TestSearchIndexModelParsing(ComparisonTestCase):
    """Test SearchIndexModel and IndexModel parsing with various patterns."""

    def test_search_index_model_basic(self):
        """Test basic SearchIndexModel parsing."""
        expected_content = """
        {
            "model_type": "SearchIndexModel",
            "definition": {
                "fields": [
                    {
                        "type": "vector",
                        "numDimensions": 1536,
                        "path": "embedding",
                        "similarity": "cosine"
                    }
                ]
            },
            "name": "vector_index",
            "type": "vectorSearch"
        }
        """

        actual_data = {
            "model_type": "SearchIndexModel",
            "definition": {
                "fields": [
                    {
                        "type": "vector",
                        "numDimensions": 1536,
                        "path": "embedding",
                        "similarity": "cosine",
                    }
                ]
            },
            "name": "vector_index",
            "type": "vectorSearch",
        }

        self.assertMatchesExpectedContent(expected_content, actual_data)

    def test_search_index_model_with_pymongo_prefix(self):
        """Test SearchIndexModel with pymongo prefix."""
        expected_content = """
        {
            "model_type": "SearchIndexModel",
            "definition": {
                "mappings": {
                    "dynamic": true
                }
            },
            "name": "my_index"
        }
        """

        actual_data = {
            "model_type": "SearchIndexModel",
            "definition": {"mappings": {"dynamic": True}},
            "name": "my_index",
        }

        self.assertMatchesExpectedContent(expected_content, actual_data)

    def test_search_index_model_array(self):
        """Test array of SearchIndexModel objects."""
        expected_content = """
        [
            {
                "model_type": "SearchIndexModel",
                "definition": {"mappings": {"dynamic": true}},
                "name": "search_idx"
            },
            {
                "model_type": "SearchIndexModel",
                "definition": {
                    "fields": [
                        {
                            "type": "vector",
                            "numDimensions": 1536,
                            "path": "embedding",
                            "similarity": "cosine"
                        }
                    ]
                },
                "name": "vector_idx",
                "type": "vectorSearch"
            }
        ]
        """

        actual_data = [
            {
                "model_type": "SearchIndexModel",
                "definition": {"mappings": {"dynamic": True}},
                "name": "search_idx",
            },
            {
                "model_type": "SearchIndexModel",
                "definition": {
                    "fields": [
                        {
                            "type": "vector",
                            "numDimensions": 1536,
                            "path": "embedding",
                            "similarity": "cosine",
                        }
                    ]
                },
                "name": "vector_idx",
                "type": "vectorSearch",
            },
        ]

        self.assertMatchesExpectedContent(expected_content, actual_data)

    def test_index_model_basic(self):
        """Test basic IndexModel parsing."""
        expected_content = """
        {
            "model_type": "IndexModel",
            "name": "compound_index",
            "keys": [["name", 1], ["age", -1]]
        }
        """

        actual_data = {
            "model_type": "IndexModel",
            "name": "compound_index",
            "keys": [["name", 1], ["age", -1]],
        }

        self.assertMatchesExpectedContent(expected_content, actual_data)

    def test_index_model_with_options(self):
        """Test IndexModel with additional options."""
        expected_content = """
        {
            "model_type": "IndexModel",
            "keys": [["name", 1]],
            "name": "name_index",
            "unique": true,
            "sparse": false
        }
        """

        actual_data = {
            "model_type": "IndexModel",
            "keys": [["name", 1]],
            "name": "name_index",
            "unique": True,
            "sparse": False,
        }

        self.assertMatchesExpectedContent(expected_content, actual_data)

    def test_mixed_index_models(self):
        """Test mixed SearchIndexModel and IndexModel in same document."""
        expected_content = """
        {
            "search_models": [
                {
                    "model_type": "SearchIndexModel",
                    "definition": {"mappings": {"dynamic": true}},
                    "name": "search_idx"
                }
            ],
            "regular_models": [
                {
                    "model_type": "IndexModel",
                    "keys": [["name", 1]],
                    "name": "name_idx"
                }
            ]
        }
        """

        actual_data = {
            "search_models": [
                {
                    "model_type": "SearchIndexModel",
                    "definition": {"mappings": {"dynamic": True}},
                    "name": "search_idx",
                }
            ],
            "regular_models": [
                {"model_type": "IndexModel", "keys": [["name", 1]], "name": "name_idx"}
            ],
        }

        self.assertMatchesExpectedContent(expected_content, actual_data)

    def test_real_world_vector_search_example(self):
        """Test real-world vector search index example from documentation."""
        expected_content = """
        [
            {
                "model_type": "SearchIndexModel",
                "definition": {
                    "fields": [
                        {
                            "type": "vector",
                            "numDimensions": 1536,
                            "path": "embedding", 
                            "similarity": "euclidean"
                        },
                        {
                            "type": "filter",
                            "path": "category"
                        }
                    ]
                },
                "name": "vector_search_index",
                "type": "vectorSearch"
            }
        ]
        """

        actual_data = [
            {
                "model_type": "SearchIndexModel",
                "definition": {
                    "fields": [
                        {
                            "type": "vector",
                            "numDimensions": 1536,
                            "path": "embedding",
                            "similarity": "euclidean",
                        },
                        {"type": "filter", "path": "category"},
                    ]
                },
                "name": "vector_search_index",
                "type": "vectorSearch",
            }
        ]

        self.assertMatchesExpectedContent(expected_content, actual_data)


if __name__ == "__main__":
    unittest.main()
