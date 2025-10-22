#!/usr/bin/env python3
"""
Test search index models comparison functionality using the Expect API.
"""
import unittest

from utils.comparison import Expect


class TestSearchIndexModels(unittest.TestCase):
    """Test search index models comparison using the Expect API."""

    def test_basic_search_index(self):
        """Test basic search index definition."""
        expected = {
            "name": "default",
            "definition": {
                "mappings": {
                    "dynamic": True
                }
            }
        }
        actual = {
            "name": "default",
            "definition": {
                "mappings": {
                    "dynamic": True
                }
            }
        }

        # Should match basic search index
        Expect.that(actual).should_match(expected)

    def test_field_specific_search_index(self):
        """Test field-specific search index definition."""
        expected = {
            "name": "title_index",
            "definition": {
                "mappings": {
                    "dynamic": False,
                    "fields": {
                        "title": {
                            "type": "string",
                            "analyzer": "lucene.standard"
                        },
                        "content": {
                            "type": "string",
                            "analyzer": "lucene.english"
                        }
                    }
                }
            }
        }
        actual = {
            "name": "title_index",
            "definition": {
                "mappings": {
                    "dynamic": False,
                    "fields": {
                        "title": {
                            "type": "string",
                            "analyzer": "lucene.standard"
                        },
                        "content": {
                            "type": "string",
                            "analyzer": "lucene.english"
                        }
                    }
                }
            }
        }

        # Should match field-specific search index
        Expect.that(actual).should_match(expected)

    def test_vector_search_index(self):
        """Test vector search index definition."""
        expected = {
            "name": "vector_index",
            "type": "vectorSearch",
            "definition": {
                "fields": [
                    {
                        "type": "vector",
                        "path": "embeddings",
                        "numDimensions": 1536,
                        "similarity": "cosine"
                    }
                ]
            }
        }
        actual = {
            "name": "vector_index",
            "type": "vectorSearch",
            "definition": {
                "fields": [
                    {
                        "type": "vector",
                        "path": "embeddings",
                        "numDimensions": 1536,
                        "similarity": "cosine"
                    }
                ]
            }
        }

        # Should match vector search index
        Expect.that(actual).should_match(expected)

    def test_compound_search_index(self):
        """Test compound search index with multiple field types."""
        expected = {
            "name": "compound_index",
            "definition": {
                "mappings": {
                    "dynamic": False,
                    "fields": {
                        "title": {
                            "type": "string",
                            "analyzer": "lucene.standard"
                        },
                        "category": {
                            "type": "stringFacet"
                        },
                        "price": {
                            "type": "number"
                        },
                        "created_date": {
                            "type": "date"
                        },
                        "tags": {
                            "type": "string",
                            "multi": True
                        }
                    }
                }
            }
        }
        actual = {
            "name": "compound_index",
            "definition": {
                "mappings": {
                    "dynamic": False,
                    "fields": {
                        "title": {
                            "type": "string",
                            "analyzer": "lucene.standard"
                        },
                        "category": {
                            "type": "stringFacet"
                        },
                        "price": {
                            "type": "number"
                        },
                        "created_date": {
                            "type": "date"
                        },
                        "tags": {
                            "type": "string",
                            "multi": True
                        }
                    }
                }
            }
        }

        # Should match compound search index
        Expect.that(actual).should_match(expected)

    def test_search_index_with_synonyms(self):
        """Test search index with synonym configuration."""
        expected = {
            "name": "synonym_index",
            "definition": {
                "mappings": {
                    "dynamic": True
                },
                "synonyms": [
                    {
                        "name": "product_synonyms",
                        "source": {
                            "collection": "synonyms"
                        },
                        "analyzer": "lucene.standard"
                    }
                ]
            }
        }
        actual = {
            "name": "synonym_index",
            "definition": {
                "mappings": {
                    "dynamic": True
                },
                "synonyms": [
                    {
                        "name": "product_synonyms",
                        "source": {
                            "collection": "synonyms"
                        },
                        "analyzer": "lucene.standard"
                    }
                ]
            }
        }

        # Should match search index with synonyms
        Expect.that(actual).should_match(expected)

    def test_search_index_array(self):
        """Test array of search index definitions."""
        expected = [
            {
                "name": "text_index",
                "definition": {
                    "mappings": {
                        "dynamic": True
                    }
                }
            },
            {
                "name": "vector_index",
                "type": "vectorSearch",
                "definition": {
                    "fields": [
                        {
                            "type": "vector",
                            "path": "embeddings",
                            "numDimensions": 768,
                            "similarity": "euclidean"
                        }
                    ]
                }
            }
        ]
        actual = [
            {
                "name": "text_index",
                "definition": {
                    "mappings": {
                        "dynamic": True
                    }
                }
            },
            {
                "name": "vector_index",
                "type": "vectorSearch",
                "definition": {
                    "fields": [
                        {
                            "type": "vector",
                            "path": "embeddings",
                            "numDimensions": 768,
                            "similarity": "euclidean"
                        }
                    ]
                }
            }
        ]

        # Should match array of search indexes
        Expect.that(actual).should_match(expected)

    def test_search_index_with_ellipsis(self):
        """Test search index with ellipsis patterns."""
        expected = {
            "name": "...",
            "definition": {
                "mappings": {
                    "dynamic": True,
                    "fields": {
                        "title": {
                            "type": "string",
                            "analyzer": "..."
                        }
                    }
                }
            },
            "status": "...",
            "queryable": True
        }
        actual = {
            "name": "dynamic_index",
            "definition": {
                "mappings": {
                    "dynamic": True,
                    "fields": {
                        "title": {
                            "type": "string",
                            "analyzer": "lucene.standard"
                        }
                    }
                }
            },
            "status": "READY",
            "queryable": True
        }

        # Should match with ellipsis patterns
        Expect.that(actual).should_match(expected)

    def test_search_index_with_ignored_fields(self):
        """Test search index with ignored fields."""
        expected = {
            "name": "test_index",
            "status": "ignored",
            "definition": {
                "mappings": {
                    "dynamic": True
                }
            }
        }
        actual = {
            "name": "test_index",
            "status": "BUILDING",
            "definition": {
                "mappings": {
                    "dynamic": True
                }
            }
        }
        # Should match with ignored status field
        Expect.that(actual).with_ignored_fields("status").should_match(expected)

    def test_fluent_api_search_index(self):
        """Test fluent API with search index."""
        expected = {
            "name": "test_index",
            "status": "ignored",
            "definition": {
                "mappings": {
                    "fields": ["field1", "field2", "field3"]
                }
            }
        }
        actual = {
            "name": "test_index",
            "status": "READY",
            "definition": {
                "mappings": {
                    "fields": ["field3", "field1", "field2"]  # Different order
                }
            }
        }

        # Should match with fluent API
        Expect.that(actual).with_ignored_fields("status").should_match(expected)

    def test_nested_search_index_fields(self):
        """Test nested search index field definitions."""
        expected = {
            "name": "nested_index",
            "definition": {
                "mappings": {
                    "fields": {
                        "user": {
                            "type": "document",
                            "fields": {
                                "name": {"type": "string"},
                                "email": {"type": "string"},
                                "profile": {
                                    "type": "document",
                                    "fields": {
                                        "age": {"type": "number"},
                                        "location": {"type": "geo"}
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        actual = {
            "name": "nested_index",
            "definition": {
                "mappings": {
                    "fields": {
                        "user": {
                            "type": "document",
                            "fields": {
                                "name": {"type": "string"},
                                "email": {"type": "string"},
                                "profile": {
                                    "type": "document",
                                    "fields": {
                                        "age": {"type": "number"},
                                        "location": {"type": "geo"}
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        # Should match nested search index fields
        Expect.that(actual).should_match(expected)


if __name__ == "__main__":
    unittest.main()
