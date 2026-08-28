"""
Live integration tests for the AI agent tutorial examples.

These tests exercise the real third-party integrations end to end: live
Voyage AI embeddings, real ``$vectorSearch`` queries against an Atlas Vector
Search index, and live OpenAI ``generate_response`` paths. They require an
Atlas cluster plus ``CONNECTION_STRING``, ``OPENAI_API_KEY``,
``OPENAI_BASE_URL``, and ``VOYAGE_API_KEY`` in the environment, and skip when
any of those are missing so the suite can run in CI without secrets.

This lives in a separate file from ``test_ai_agent.py`` on purpose. The unit
suite installs mock ``voyageai``/``openai`` SDKs into ``sys.modules`` only
around its own example imports and then restores the real entries, so no mock
is left behind for this file. The example modules themselves are a different
matter: they bind the mocked names at import time and Python caches them, so
the copies the unit suite imported stay bound to the mocks. ``unittest
discover`` loads that module first (alphabetical order), so without
intervention these tests would reuse those cached modules and never touch the
real APIs. Before importing the example modules, this file drops the cached
``ai_agent`` modules from ``sys.modules`` so the import below re-executes them
against the real vendor clients.

Because live LLM output is non-deterministic, assertions verify behavior and
structure (embedding dimensions, non-empty search hits, valid tool selection,
chat history ordering) rather than exact model wording.
"""

import os
import sys
import unittest

from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

REQUIRED_ENV_VARS = [
    "CONNECTION_STRING",
    "OPENAI_API_KEY",
    "OPENAI_BASE_URL",
    "VOYAGE_API_KEY",
]
MISSING_ENV_VARS = [name for name in REQUIRED_ENV_VARS if not os.getenv(name)]

CONNECTION_STRING = os.getenv("CONNECTION_STRING")

# Import the example modules with the real SDKs only when the integration
# environment is fully configured. When it is not (for example, in CI), the
# class below skips and this import block never runs.
if not MISSING_ENV_VARS:
    # Drop any example modules the unit suite imported while its mock SDKs were
    # active, so the import below re-executes them against the real clients.
    # The mock SDKs themselves are already gone: the unit suite restores the
    # real ``sys.modules`` entries as soon as its own imports finish.
    for _cached in [
        name
        for name in sys.modules
        if name.startswith("examples.vector_search.ai_agent")
    ]:
        del sys.modules[_cached]

    import examples.vector_search.ai_agent.config as config
    import examples.vector_search.ai_agent.ingest_data as ingest_data
    import examples.vector_search.ai_agent.tools as tools
    import examples.vector_search.ai_agent.memory as memory
    import examples.vector_search.ai_agent.planning as planning


@unittest.skipIf(
    MISSING_ENV_VARS,
    f"Missing required environment variables: {', '.join(MISSING_ENV_VARS)}",
)
class TestAiAgentIntegration(unittest.TestCase):
    """Live integration tests that require third-party API keys and Atlas."""

    client = None

    @classmethod
    def setUpClass(cls):
        cls.client = MongoClient(CONNECTION_STRING)
        # Start from a clean database, then ingest the real PDF and build the
        # Atlas Vector Search index once for the whole suite. This performs
        # real Voyage AI embedding calls and creates a live search index, so it
        # can take a minute or more to complete.
        cls.client.drop_database("ai_agent_db")
        ingest_data.ingest_data()

    def setUp(self):
        # Preserve the ingested embeddings and vector index built in
        # setUpClass; only reset chat history so memory-related tests start
        # from a known state.
        config.memory_collection.delete_many({})

    def test_get_embedding_returns_1024_dim_vector(self):
        """get_embedding: should return a 1024-dimension embedding vector from Voyage AI."""
        embedding = ingest_data.get_embedding("MongoDB acquired Voyage AI.")

        self.assertIsInstance(embedding, list)
        self.assertEqual(len(embedding), 1024)
        self.assertTrue(all(isinstance(value, float) for value in embedding))

    def test_ingest_data_populates_embeddings_collection(self):
        """ingest_data: should populate ai_agent_db.embeddings with embedded PDF chunks."""
        docs = list(config.vector_collection.find({}))

        self.assertGreater(len(docs), 0)
        first = docs[0]
        self.assertIn("text", first)
        self.assertIn("embedding", first)
        self.assertEqual(len(first["embedding"]), 1024)

    def test_vector_search_tool_returns_results(self):
        """vector_search_tool: should return matching documents from a live $vectorSearch query."""
        results = tools.vector_search_tool("What was MongoDB's latest acquisition?")

        self.assertIsInstance(results, list)
        self.assertGreater(len(results), 0)
        self.assertIn("text", results[0])

    def test_tool_selector_returns_valid_tool(self):
        """tool_selector: should return one of the valid tool options for a math question via a live LLM call."""
        tool, tool_input = planning.tool_selector("What is 123+456?")

        # Live LLM tool selection is non-deterministic, so assert only that the
        # returned tool is one of the valid options rather than a specific tool.
        self.assertIn(tool, {"vector_search_tool", "calculator_tool", "none"})
        self.assertIsInstance(tool_input, str)

    def test_generate_response_calculator_path(self):
        """generate_response: should answer a math question and store the exchange in memory."""
        result = planning.generate_response("calc-session", "What is 123+456?")

        self.assertIn("579", result)
        history = memory.retrieve_session_history("calc-session")
        self.assertEqual(len(history), 2)
        self.assertEqual(history[0]["role"], "user")
        self.assertEqual(history[1]["role"], "system")

    def test_generate_response_vector_search_path(self):
        """generate_response: should return a non-empty answer for a knowledge-base question."""
        result = planning.generate_response(
            "search-session", "What was MongoDB's latest acquisition?"
        )

        self.assertIsInstance(result, str)
        self.assertGreater(len(result.strip()), 0)

    @classmethod
    def tearDownClass(cls):
        if cls.client is not None:
            cls.client.drop_database("ai_agent_db")
            cls.client.close()
