import os
import unittest

from dotenv import load_dotenv
from pymongo import MongoClient

import examples.ai_integrations.langchain.agent_toolkit as agent_toolkit
from tests_package.ai_integrations.langchain.index_helpers import has_openai_key

load_dotenv()

SEED_CUSTOMERS = [
    {"name": "Ana", "country": "Brazil", "spend": 120},
    {"name": "Ben", "country": "Canada", "spend": 450},
    {"name": "Cleo", "country": "Canada", "spend": 300},
]


@unittest.skipUnless(
    has_openai_key(), "OPENAI_API_KEY is not set; skipping OpenAI tests."
)
class TestAgentToolkit(unittest.TestCase):
    CONNECTION_STRING = None
    client = None

    @classmethod
    def setUpClass(cls):
        TestAgentToolkit.CONNECTION_STRING = os.getenv("CONNECTION_STRING")

        if TestAgentToolkit.CONNECTION_STRING is None:
            raise Exception(
                "Could not retrieve CONNECTION_STRING - make sure you have created "
                "the .env file at the root of the PyMongo directory and the variable "
                "is correctly named as CONNECTION_STRING."
            )
        try:
            TestAgentToolkit.client = MongoClient(TestAgentToolkit.CONNECTION_STRING)
        except Exception:
            raise Exception(
                "CONNECTION_STRING invalid - make sure your connection string in "
                "your .env file matches the one for your MongoDB deployment."
            )

    def setUp(self):
        TestAgentToolkit.client.drop_database("langchain_db")
        TestAgentToolkit.client["langchain_db"]["customers"].insert_many(
            [dict(doc) for doc in SEED_CUSTOMERS]
        )

    def test_agent_returns_messages(self):
        """Agent Toolkit: should return the agent's message history."""
        messages = agent_toolkit.query_with_agent_toolkit(
            TestAgentToolkit.CONNECTION_STRING
        )

        self.assertGreater(len(messages), 0)

    def test_agent_produces_final_answer(self):
        """Agent Toolkit: should produce a non-empty final response."""
        messages = agent_toolkit.query_with_agent_toolkit(
            TestAgentToolkit.CONNECTION_STRING
        )

        self.assertIsInstance(messages[-1].content, str)
        self.assertGreater(len(messages[-1].content), 0)

    @classmethod
    def tearDownClass(cls):
        if cls.client is not None:
            cls.client.drop_database("langchain_db")
            cls.client.close()
