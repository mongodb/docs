"""
Unit tests for the AI agent tutorial examples.

``TestAiAgentUnit`` runs without any third-party API keys. It mocks the
``voyageai`` and ``openai`` SDKs via ``sys.modules`` before the example modules
load (the same pattern as the RAG tests), so config.py can import and the
calculator, memory, and vector search logic run against the local MongoDB
deployment in CI. ``Collection.aggregate`` is patched where needed because
``$vectorSearch`` requires an Atlas Vector Search index.

The live end-to-end integration tests (real Voyage AI embeddings, live
``$vectorSearch`` queries, and live OpenAI ``generate_response`` paths) live in
``test_ai_agent_integration.py``. They are kept in a separate file so that the
``sys.modules`` mocks installed here do not bind the example modules to the
mock SDKs when the integration suite runs locally with real credentials.
"""

import os
import sys
import unittest
from unittest.mock import MagicMock, patch

from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

CONNECTION_STRING = os.getenv("CONNECTION_STRING")

# --- Pre-import mocking ---
# config.py initializes voyageai.Client() and OpenAI() at import time, so the
# example modules cannot be imported without valid credentials. ingest_data.py
# imports LangChain's PDF loader and text splitter, and tools.py imports from
# ingest_data, so importing any agent module also pulls in LangChain and its
# heavy transitive dependencies (transformers). Replacing all of these via
# sys.modules before import lets the unit tests import config.py and exercise
# the calculator, memory, and MongoDB logic without API keys.
#
# The mocks are installed only for the duration of the example imports below
# and are then restored. The example modules bind the names they need at import
# time (config.py binds the client instances, ingest_data.py binds PyPDFLoader
# and RecursiveCharacterTextSplitter), so they keep their mocks afterward.
#
# Leaving the mocks in sys.modules permanently breaks any test module that
# imports the real package later in the same interpreter: a MagicMock has no
# __path__, so submodule imports such as langchain_community.storage fail with
# "is not a package". Test discovery imports every test module before running
# any test, so a leaked mock reaches tests that import lazily inside a function.
_mock_voyageai = MagicMock()
_mock_vo_instance = MagicMock()
_mock_voyageai.Client.return_value = _mock_vo_instance

_mock_openai_module = MagicMock()
_mock_openai_client_instance = MagicMock()
_mock_openai_module.OpenAI.return_value = _mock_openai_client_instance

_mock_lc_document_loaders = MagicMock()
_mock_lc_community = MagicMock()
_mock_lc_community.document_loaders = _mock_lc_document_loaders

_import_mocks = {
    "voyageai": _mock_voyageai,
    "openai": _mock_openai_module,
    "langchain_community": _mock_lc_community,
    "langchain_community.document_loaders": _mock_lc_document_loaders,
    "langchain_text_splitters": MagicMock(),
}
_saved_modules = {name: sys.modules.get(name) for name in _import_mocks}
sys.modules.update(_import_mocks)

# Import the example modules only when a MongoDB connection string is present.
# The unit tests need a live local deployment to exercise the memory logic.
try:
    if CONNECTION_STRING:
        import examples.vector_search.ai_agent.config as config
        import examples.vector_search.ai_agent.ingest_data as ingest_data
        import examples.vector_search.ai_agent.tools as tools
        import examples.vector_search.ai_agent.memory as memory
        import examples.vector_search.ai_agent.planning as planning
        import examples.vector_search.ai_agent.main as main
finally:
    for _name, _original in _saved_modules.items():
        if _original is None:
            sys.modules.pop(_name, None)
        else:
            sys.modules[_name] = _original


@unittest.skipIf(
    not CONNECTION_STRING,
    "Missing required environment variable: CONNECTION_STRING",
)
class TestAiAgentUnit(unittest.TestCase):
    """Unit tests for AI agent logic that run without third-party API keys."""

    client = None

    @classmethod
    def setUpClass(cls):
        cls.client = MongoClient(CONNECTION_STRING)

    def setUp(self):
        # Return a deterministic 1024-dim embedding for any Voyage call.
        _mock_vo_instance.embed.reset_mock()
        _mock_vo_instance.embed.return_value = MagicMock(
            embeddings=[[0.1] * 1024]
        )
        # Reset chat history so memory tests start from a known state.
        config.memory_collection.delete_many({})

    def test_get_embedding_forwards_input_type(self):
        """get_embedding: should forward the input_type parameter to Voyage AI."""
        ingest_data.get_embedding("search query", input_type="query")

        _mock_vo_instance.embed.assert_called_once_with(
            "search query", model=config.VOYAGE_MODEL, input_type="query"
        )

    def test_calculator_tool_evaluates_expression(self):
        """calculator_tool: should return the result of a valid expression as a string."""
        self.assertEqual(tools.calculator_tool("123+456"), "579")

    def test_calculator_tool_handles_errors(self):
        """calculator_tool: should return an error string for an invalid expression."""
        self.assertTrue(tools.calculator_tool("1/0").startswith("Error:"))

    def test_memory_stores_and_retrieves_history(self):
        """memory: should store messages and retrieve them in chronological order."""
        memory.store_chat_message(
            "session-1", "user", "What was MongoDB's latest acquisition?"
        )
        memory.store_chat_message("session-1", "system", "MongoDB acquired Voyage AI.")

        history = memory.retrieve_session_history("session-1")

        self.assertEqual(
            history,
            [
                {"role": "user", "content": "What was MongoDB's latest acquisition?"},
                {"role": "system", "content": "MongoDB acquired Voyage AI."},
            ],
        )

    def test_memory_isolates_sessions(self):
        """retrieve_session_history: should only return messages for the requested session."""
        memory.store_chat_message("session-a", "user", "hello from a")
        memory.store_chat_message("session-b", "user", "hello from b")

        history = memory.retrieve_session_history("session-a")

        self.assertEqual(len(history), 1)
        self.assertEqual(history[0]["content"], "hello from a")

    @patch("pymongo.collection.Collection.aggregate")
    def test_vector_search_tool_builds_pipeline(self, mock_aggregate):
        """vector_search_tool: should run a $vectorSearch pipeline and return a list."""
        mock_aggregate.return_value = iter([{"text": "MongoDB acquired Voyage AI."}])

        results = tools.vector_search_tool("What was MongoDB's latest acquisition?")

        self.assertIsInstance(results, list)
        self.assertEqual(results[0]["text"], "MongoDB acquired Voyage AI.")
        pipeline = mock_aggregate.call_args[0][0]
        vector_stage = pipeline[0]["$vectorSearch"]
        self.assertEqual(vector_stage["index"], "vector_index")
        self.assertEqual(vector_stage["path"], "embedding")

    def test_main_module_imports(self):
        """main: should expose the agent entry points without running the REPL."""
        self.assertTrue(hasattr(main, "generate_response"))
        self.assertTrue(hasattr(main, "ingest_data"))
        self.assertTrue(hasattr(main, "mongo_client"))

    @classmethod
    def tearDownClass(cls):
        if cls.client is not None:
            cls.client.drop_database("ai_agent_db")
            cls.client.close()
