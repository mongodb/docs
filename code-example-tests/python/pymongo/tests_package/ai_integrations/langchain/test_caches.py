import os
import unittest

from dotenv import load_dotenv
from pymongo import MongoClient

import examples.ai_integrations.langchain.caches as caches
from tests_package.ai_integrations.langchain.index_helpers import (
    ensure_vector_index,
    has_voyage_key,
)

# Loaded at import time so the skip decorators below can read the API keys.
load_dotenv()


class TestCaches(unittest.TestCase):
    CONNECTION_STRING = None
    client = None

    @classmethod
    def setUpClass(cls):
        load_dotenv()
        TestCaches.CONNECTION_STRING = os.getenv("CONNECTION_STRING")

        if TestCaches.CONNECTION_STRING is None:
            raise Exception(
                "Could not retrieve CONNECTION_STRING - make sure you have created "
                "the .env file at the root of the PyMongo directory and the variable "
                "is correctly named as CONNECTION_STRING."
            )
        try:
            TestCaches.client = MongoClient(TestCaches.CONNECTION_STRING)
        except Exception:
            raise Exception(
                "CONNECTION_STRING invalid - make sure your connection string in "
                "your .env file matches the one for your MongoDB deployment."
            )

    def setUp(self):
        TestCaches.client.drop_database("langchain_db")

    def test_set_basic_cache_registers_cache(self):
        """MongoDB Cache: should register a MongoDBCache as the global LLM cache."""
        from langchain_mongodb import MongoDBCache

        cache = caches.set_basic_cache(TestCaches.CONNECTION_STRING)

        self.assertIsInstance(cache, MongoDBCache)

    def test_cache_llm_response_returns_cached_generation(self):
        """MongoDB Cache: should return the stored generation on a cache hit."""
        result = caches.cache_llm_response(TestCaches.CONNECTION_STRING)

        self.assertEqual(result, ["Paris"])

    def test_cache_llm_response_persists_to_collection(self):
        """MongoDB Cache: should write the cached entry to the cache collection."""
        caches.cache_llm_response(TestCaches.CONNECTION_STRING)

        count = TestCaches.client["langchain_db"]["cache"].count_documents({})
        self.assertEqual(count, 1)

    @unittest.skipUnless(
        has_voyage_key(), "VOYAGE_API_KEY is not set; skipping Voyage AI tests."
    )
    def test_set_semantic_cache_registers_cache(self):
        """Semantic Cache: should register a MongoDBAtlasSemanticCache globally."""
        from langchain_mongodb import MongoDBAtlasSemanticCache

        collection = TestCaches.client["langchain_db"]["semantic_cache"]
        collection.insert_one({"placeholder": True})
        collection.delete_many({"placeholder": True})
        ensure_vector_index(collection, index_name="default")

        cache = caches.set_semantic_cache(TestCaches.CONNECTION_STRING)

        self.assertIsInstance(cache, MongoDBAtlasSemanticCache)

    @classmethod
    def tearDownClass(cls):
        if cls.client is not None:
            cls.client.drop_database("langchain_db")
            cls.client.close()
