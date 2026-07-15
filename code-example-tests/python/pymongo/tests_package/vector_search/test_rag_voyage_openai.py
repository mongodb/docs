"""
Tests for the RAG pipeline examples (Voyage AI embeddings + OpenAI generation).

Mock notices
------------
- voyageai: Replaced via sys.modules before any example module loads.
  The module-level ``vo = voyageai.Client()`` in get_embeddings_voyage.py
  receives a MagicMock instance. No real Voyage AI API calls are made.
- openai: Replaced via sys.modules before rag_pipeline loads.
  ``OpenAI()`` in generate_response() returns a MagicMock. No real
  OpenAI API calls are made.
- huggingface_hub: Replaced via sys.modules before rag_pipeline loads.
  ``InferenceClient(...)`` in generate_response_hf() returns a MagicMock.
  No real Hugging Face Inference API calls are made.
- Collection.aggregate (retrieval and generation tests): Patched at the
  PyMongo class level because $vectorSearch requires an Atlas Vector Search
  index not available on standard MongoDB deployments.
- MongoClient (index creation test): Patched in examples.vector_search.rag
  .rag_pipeline because create_search_index and list_search_indexes are
  Atlas-only operations.
"""

import sys
import unittest
from unittest.mock import MagicMock, patch
import os
from dotenv import load_dotenv
from pymongo import MongoClient
from pymongo.operations import SearchIndexModel

# --- Pre-import mocking ---
# These sys.modules replacements must happen before the example modules are
# imported so that module-level initialization (voyageai.Client(),
# from openai import OpenAI) uses MagicMocks instead of real packages.

_mock_voyageai = MagicMock()
_mock_vo_instance = MagicMock()
_mock_voyageai.Client.return_value = _mock_vo_instance
sys.modules["voyageai"] = _mock_voyageai

_mock_openai_module = MagicMock()
_mock_openai_client_instance = MagicMock()
_mock_openai_module.OpenAI.return_value = _mock_openai_client_instance
sys.modules["openai"] = _mock_openai_module

_mock_hf_module = MagicMock()
_mock_hf_client_instance = MagicMock()
_mock_hf_module.InferenceClient.return_value = _mock_hf_client_instance
sys.modules["huggingface_hub"] = _mock_hf_module

# Import example modules only after mocks are in place
import examples.vector_search.rag.get_embeddings_voyage as get_embeddings_voyage
import examples.vector_search.rag.rag_pipeline as rag_pipeline


class TestRagVoyageOpenAI(unittest.TestCase):
    CONNECTION_STRING = None
    client = None

    @classmethod
    def setUpClass(cls):
        load_dotenv()
        TestRagVoyageOpenAI.CONNECTION_STRING = os.getenv("CONNECTION_STRING")

        if TestRagVoyageOpenAI.CONNECTION_STRING is None:
            raise Exception(
                "Could not retrieve CONNECTION_STRING - make sure you have created "
                "the .env file at the root of the PyMongo directory and the variable "
                "is correctly named as CONNECTION_STRING."
            )
        try:
            TestRagVoyageOpenAI.client = MongoClient(TestRagVoyageOpenAI.CONNECTION_STRING)
        except Exception:
            raise Exception(
                "CONNECTION_STRING invalid - make sure your connection string in "
                "your .env file matches the one for your MongoDB deployment."
            )

    def setUp(self):
        # Configure voyageai mock to return a 1024-dimension fake embedding.
        # (Voyage AI voyage-3-large produces 1024-dim vectors.)
        _mock_vo_instance.embed.reset_mock()
        _mock_vo_instance.embed.return_value = MagicMock(
            embeddings=[[0.1] * 1024]
        )
        _mock_hf_client_instance.chat_completion.reset_mock()
        TestRagVoyageOpenAI.client.drop_database("rag_db")

    def test_get_embedding_returns_first_embedding(self):
        """get_embedding: should return the first embedding vector from the API response."""
        result = get_embeddings_voyage.get_embedding("test text")

        self.assertEqual(result, [0.1] * 1024)
        _mock_vo_instance.embed.assert_called_once_with(
            "test text", model="voyage-3-large", input_type="document"
        )

    def test_get_embedding_passes_input_type(self):
        """get_embedding: should forward input_type parameter to the API."""
        get_embeddings_voyage.get_embedding("search query", input_type="query")

        _mock_vo_instance.embed.assert_called_once_with(
            "search query", model="voyage-3-large", input_type="query"
        )

    def test_ingest_documents_inserts_correct_count(self):
        """ingest_documents: should insert five documents into rag_db.test."""
        result = rag_pipeline.ingest_documents(TestRagVoyageOpenAI.CONNECTION_STRING)

        self.assertEqual(result["inserted_count"], 5)

    def test_ingest_documents_stores_text_and_embedding(self):
        """ingest_documents: each document should have text and embedding fields."""
        rag_pipeline.ingest_documents(TestRagVoyageOpenAI.CONNECTION_STRING)

        collection = TestRagVoyageOpenAI.client["rag_db"]["test"]
        doc = collection.find_one({})
        self.assertIn("text", doc)
        self.assertIn("embedding", doc)
        self.assertIsInstance(doc["embedding"], list)
        self.assertEqual(len(doc["embedding"]), 1024)

    @patch("examples.vector_search.rag.rag_pipeline.MongoClient")
    def test_create_search_index_uses_correct_model(self, MockMongoClient):
        """create_search_index: should call create_search_index with a vectorSearch model."""
        # Arrange: mock collection returns a ready index on first poll
        mock_client_instance = MockMongoClient.return_value
        mock_db = mock_client_instance.__getitem__.return_value
        mock_collection = mock_db.__getitem__.return_value
        mock_collection.list_search_indexes.return_value = iter(
            [{"queryable": True}]
        )

        result = rag_pipeline.create_search_index(TestRagVoyageOpenAI.CONNECTION_STRING)

        # Assert: create_search_index was called once
        mock_collection.create_search_index.assert_called_once()
        call_kwargs = mock_collection.create_search_index.call_args[1]
        model = call_kwargs["model"]

        self.assertIsInstance(model, SearchIndexModel)
        self.assertEqual(result, "vector_index")

    @patch("pymongo.collection.Collection.aggregate")
    def test_get_query_results_returns_document_list(self, mock_aggregate):
        """get_query_results: should return a list of documents from the vector search."""
        # Arrange: aggregate returns two pre-defined result documents
        mock_aggregate.return_value = iter(
            [
                {"text": "MongoDB Atlas Vector Search enables semantic similarity queries."},
                {"text": "AI-powered applications require reliable data infrastructure."},
            ]
        )

        result = rag_pipeline.get_query_results(
            TestRagVoyageOpenAI.CONNECTION_STRING, "AI technology"
        )

        self.assertIsInstance(result, list)
        self.assertEqual(len(result), 2)
        self.assertIn("text", result[0])

    @patch("pymongo.collection.Collection.aggregate")
    def test_get_query_results_passes_correct_pipeline(self, mock_aggregate):
        """get_query_results: should use a $vectorSearch stage with the correct index and path."""
        mock_aggregate.return_value = iter([{"text": "sample result"}])

        rag_pipeline.get_query_results(
            TestRagVoyageOpenAI.CONNECTION_STRING, "AI technology"
        )

        pipeline = mock_aggregate.call_args[0][0]
        vector_stage = pipeline[0]["$vectorSearch"]
        self.assertEqual(vector_stage["index"], "vector_index")
        self.assertEqual(vector_stage["path"], "embedding")
        self.assertEqual(vector_stage["exact"], True)
        self.assertEqual(vector_stage["limit"], 5)

    @patch("pymongo.collection.Collection.aggregate")
    def test_generate_response_returns_string(self, mock_aggregate):
        """generate_response: should return the LLM completion text."""
        # Arrange: aggregate provides context docs; openai returns a completion
        mock_aggregate.return_value = iter(
            [{"text": "MongoDB Atlas Vector Search enables semantic similarity queries."}]
        )
        mock_completion = MagicMock()
        mock_completion.choices[0].message.content = (
            "MongoDB's latest AI announcements include Atlas Vector Search."
        )
        _mock_openai_client_instance.chat.completions.create.return_value = (
            mock_completion
        )

        result = rag_pipeline.generate_response(
            TestRagVoyageOpenAI.CONNECTION_STRING,
            "What are MongoDB's latest AI announcements?",
        )

        self.assertIsInstance(result, str)
        self.assertTrue(len(result) > 0)

    @patch("pymongo.collection.Collection.aggregate")
    def test_generate_response_calls_openai_with_context(self, mock_aggregate):
        """generate_response: should pass retrieved context to the OpenAI API."""
        context_text = "MongoDB Atlas Vector Search enables semantic similarity queries."
        mock_aggregate.return_value = iter([{"text": context_text}])

        mock_completion = MagicMock()
        mock_completion.choices[0].message.content = "Generated answer."
        _mock_openai_client_instance.chat.completions.create.return_value = (
            mock_completion
        )

        rag_pipeline.generate_response(
            TestRagVoyageOpenAI.CONNECTION_STRING,
            "What are MongoDB's latest AI announcements?",
        )

        _mock_openai_client_instance.chat.completions.create.assert_called_once()
        call_kwargs = _mock_openai_client_instance.chat.completions.create.call_args[1]
        self.assertEqual(call_kwargs["model"], "gpt-4o")
        prompt_content = call_kwargs["messages"][0]["content"]
        self.assertIn(context_text, prompt_content)

    @patch("pymongo.collection.Collection.aggregate")
    def test_generate_response_hf_returns_string(self, mock_aggregate):
        """generate_response_hf: should return the LLM completion text."""
        mock_aggregate.return_value = iter(
            [{"text": "MongoDB Atlas Vector Search enables semantic similarity queries."}]
        )
        mock_output = MagicMock()
        mock_output.choices[0].message.content = (
            "MongoDB's latest AI announcements include the MongoDB AI Applications Program."
        )
        _mock_hf_client_instance.chat_completion.return_value = mock_output

        result = rag_pipeline.generate_response_hf(
            TestRagVoyageOpenAI.CONNECTION_STRING,
            "What are MongoDB's latest AI announcements?",
        )

        self.assertIsInstance(result, str)
        self.assertTrue(len(result) > 0)

    @patch("pymongo.collection.Collection.aggregate")
    def test_generate_response_hf_calls_llm_with_context(self, mock_aggregate):
        """generate_response_hf: should pass retrieved context to the Hugging Face model."""
        context_text = "MongoDB Atlas Vector Search enables semantic similarity queries."
        mock_aggregate.return_value = iter([{"text": context_text}])

        mock_output = MagicMock()
        mock_output.choices[0].message.content = "Generated answer."
        _mock_hf_client_instance.chat_completion.return_value = mock_output

        rag_pipeline.generate_response_hf(
            TestRagVoyageOpenAI.CONNECTION_STRING,
            "What are MongoDB's latest AI announcements?",
        )

        _mock_hf_client_instance.chat_completion.assert_called_once()
        call_kwargs = _mock_hf_client_instance.chat_completion.call_args[1]
        self.assertEqual(call_kwargs["max_tokens"], 150)
        prompt_content = call_kwargs["messages"][0]["content"]
        self.assertIn(context_text, prompt_content)

    @classmethod
    def tearDownClass(cls):
        if cls.client is not None:
            cls.client.drop_database("rag_db")
            cls.client.close()
