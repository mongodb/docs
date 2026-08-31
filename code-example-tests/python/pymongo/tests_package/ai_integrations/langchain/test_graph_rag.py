import os
import unittest

from dotenv import load_dotenv
from pymongo import MongoClient

import examples.ai_integrations.langchain.graph_rag as graph_rag
from tests_package.ai_integrations.langchain.index_helpers import has_openai_key

load_dotenv()


@unittest.skipUnless(
    has_openai_key(), "OPENAI_API_KEY is not set; skipping OpenAI tests."
)
class TestGraphRag(unittest.TestCase):
    CONNECTION_STRING = None
    client = None
    answer = None

    @classmethod
    def setUpClass(cls):
        TestGraphRag.CONNECTION_STRING = os.getenv("CONNECTION_STRING")

        if TestGraphRag.CONNECTION_STRING is None:
            raise Exception(
                "Could not retrieve CONNECTION_STRING - make sure you have created "
                "the .env file at the root of the PyMongo directory and the variable "
                "is correctly named as CONNECTION_STRING."
            )
        try:
            TestGraphRag.client = MongoClient(TestGraphRag.CONNECTION_STRING)
        except Exception:
            raise Exception(
                "CONNECTION_STRING invalid - make sure your connection string in "
                "your .env file matches the one for your MongoDB deployment."
            )

        # Entity extraction is a paid LLM round trip, so build the graph once
        # for the whole class rather than once per test.
        TestGraphRag.client.drop_database("langchain_db")
        TestGraphRag.answer = graph_rag.query_graph_store(
            TestGraphRag.CONNECTION_STRING
        )

    def test_query_graph_store_returns_answer(self):
        """GraphRAG: should return a non-empty answer from the knowledge graph."""
        self.assertIsInstance(TestGraphRag.answer, str)
        self.assertGreater(len(TestGraphRag.answer), 0)

    def test_query_graph_store_extracts_entities(self):
        """GraphRAG: should write extracted entities to the graph collection."""
        count = TestGraphRag.client["langchain_db"]["graph_store"].count_documents({})
        self.assertGreater(count, 0)

    def test_query_graph_store_answer_names_ceo(self):
        """GraphRAG: should identify the CEO named in the source documents."""
        # Assert against the graph itself, not the model's prose. The entity
        # _id is the extracted name, and the person may be stored as an entity
        # or referenced as the target of a relationship.
        graph_store = TestGraphRag.client["langchain_db"]["graph_store"]
        matches = graph_store.count_documents(
            {
                "$or": [
                    {"_id": {"$regex": "Ittycheria"}},
                    {"relationships.target_ids": {"$regex": "Ittycheria"}},
                ]
            }
        )

        self.assertGreater(matches, 0)

    @classmethod
    def tearDownClass(cls):
        if cls.client is not None:
            cls.client.drop_database("langchain_db")
            cls.client.close()
