import os
import unittest

from dotenv import load_dotenv
from pymongo import MongoClient

import examples.ai_integrations.langchain.document_loader as document_loader

SEED_DOCUMENTS = [
    {
        "title": "Vector Search",
        "summary": "Find semantically similar documents.",
        "category": "ai",
    },
    {
        "title": "Aggregation Pipelines",
        "summary": "Transform documents in stages.",
        "category": "database",
    },
]


class TestDocumentLoader(unittest.TestCase):
    CONNECTION_STRING = None
    client = None

    @classmethod
    def setUpClass(cls):
        load_dotenv()
        TestDocumentLoader.CONNECTION_STRING = os.getenv("CONNECTION_STRING")

        if TestDocumentLoader.CONNECTION_STRING is None:
            raise Exception(
                "Could not retrieve CONNECTION_STRING - make sure you have created "
                "the .env file at the root of the PyMongo directory and the variable "
                "is correctly named as CONNECTION_STRING."
            )
        try:
            TestDocumentLoader.client = MongoClient(
                TestDocumentLoader.CONNECTION_STRING
            )
        except Exception:
            raise Exception(
                "CONNECTION_STRING invalid - make sure your connection string in "
                "your .env file matches the one for your MongoDB deployment."
            )

    def setUp(self):
        TestDocumentLoader.client.drop_database("langchain_db")
        TestDocumentLoader.client["langchain_db"]["documents"].insert_many(
            [dict(doc) for doc in SEED_DOCUMENTS]
        )

    def test_load_documents_applies_filter_criteria(self):
        """Document Loader: should load only documents matching the filter."""
        docs = document_loader.load_documents(TestDocumentLoader.CONNECTION_STRING)

        self.assertEqual(len(docs), 1)

    def test_load_documents_includes_requested_fields(self):
        """Document Loader: should build page content from the requested fields."""
        docs = document_loader.load_documents(TestDocumentLoader.CONNECTION_STRING)

        content = docs[0].page_content
        self.assertIn("Vector Search", content)
        self.assertIn("Find semantically similar documents.", content)

    def test_load_documents_extracts_metadata(self):
        """Document Loader: should extract the requested metadata fields."""
        docs = document_loader.load_documents(TestDocumentLoader.CONNECTION_STRING)

        self.assertEqual(docs[0].metadata["category"], "ai")

    @classmethod
    def tearDownClass(cls):
        if cls.client is not None:
            cls.client.drop_database("langchain_db")
            cls.client.close()
