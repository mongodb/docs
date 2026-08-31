import os
import unittest

from dotenv import load_dotenv
from pymongo import MongoClient

import examples.ai_integrations.langchain.vector_store as vector_store
from tests_package.ai_integrations.langchain.index_helpers import (
    VOYAGE_DIMENSIONS,
    ensure_vector_index,
    has_voyage_key,
    wait_for_search_results,
)

load_dotenv()


@unittest.skipUnless(
    has_voyage_key(), "VOYAGE_API_KEY is not set; skipping Voyage AI tests."
)
class TestVectorStore(unittest.TestCase):
    CONNECTION_STRING = None
    client = None

    @classmethod
    def setUpClass(cls):
        TestVectorStore.CONNECTION_STRING = os.getenv("CONNECTION_STRING")

        if TestVectorStore.CONNECTION_STRING is None:
            raise Exception(
                "Could not retrieve CONNECTION_STRING - make sure you have created "
                "the .env file at the root of the PyMongo directory and the variable "
                "is correctly named as CONNECTION_STRING."
            )
        try:
            TestVectorStore.client = MongoClient(TestVectorStore.CONNECTION_STRING)
        except Exception:
            raise Exception(
                "CONNECTION_STRING invalid - make sure your connection string in "
                "your .env file matches the one for your MongoDB deployment."
            )

        # Create the collection and its vector index once for the whole suite,
        # because Atlas Search index builds are slow.
        collection = TestVectorStore.client["langchain_db"]["vector_store"]
        collection.insert_one({"placeholder": True})
        collection.delete_many({"placeholder": True})
        ensure_vector_index(collection)

    def setUp(self):
        TestVectorStore.client["langchain_db"]["vector_store"].delete_many({})

    def test_from_connection_string_returns_vector_store(self):
        """Vector Store: should build a vector store from a connection string."""
        from langchain_mongodb.vectorstores import MongoDBAtlasVectorSearch

        store = vector_store.create_vector_store_from_connection_string(
            TestVectorStore.CONNECTION_STRING
        )

        self.assertIsInstance(store, MongoDBAtlasVectorSearch)

    def test_from_connection_string_uses_configured_index(self):
        """Vector Store: should use the vector_index search index."""
        store = vector_store.create_vector_store_from_connection_string(
            TestVectorStore.CONNECTION_STRING
        )

        self.assertEqual(store._index_name, "vector_index")

    def test_from_client_embeds_and_retrieves_documents(self):
        """Vector Store: should embed added documents and retrieve them by similarity."""
        from langchain_core.documents import Document

        store = vector_store.create_vector_store_from_client(
            TestVectorStore.CONNECTION_STRING
        )
        store.add_documents(
            [
                Document(page_content="MongoDB Atlas Vector Search finds similar text."),
                Document(page_content="Aggregation pipelines transform documents."),
            ]
        )

        results = wait_for_search_results(
            lambda: store.similarity_search("semantic similarity", k=1)
        )

        self.assertEqual(len(results), 1)

    def test_from_client_stores_embedding_field(self):
        """Vector Store: should write a 1024-dimension embedding for each document."""
        from langchain_core.documents import Document

        store = vector_store.create_vector_store_from_client(
            TestVectorStore.CONNECTION_STRING
        )
        store.add_documents([Document(page_content="foo")])

        doc = TestVectorStore.client["langchain_db"]["vector_store"].find_one({})
        self.assertIn("embedding", doc)
        self.assertEqual(len(doc["embedding"]), VOYAGE_DIMENSIONS)

    def test_from_documents_inserts_both_documents(self):
        """Vector Store: should insert every document passed to from_documents."""
        vector_store.create_vector_store_from_documents(
            TestVectorStore.CONNECTION_STRING
        )

        count = TestVectorStore.client["langchain_db"][
            "vector_store"
        ].count_documents({})
        self.assertEqual(count, 2)

    def test_from_documents_preserves_metadata(self):
        """Vector Store: should persist the metadata supplied on each document."""
        vector_store.create_vector_store_from_documents(
            TestVectorStore.CONNECTION_STRING
        )

        doc = TestVectorStore.client["langchain_db"]["vector_store"].find_one(
            {"text": "foo"}
        )
        self.assertEqual(doc["baz"], "bar")

    @classmethod
    def tearDownClass(cls):
        if cls.client is not None:
            cls.client.drop_database("langchain_db")
            cls.client.close()
