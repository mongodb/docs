import io
import os
import unittest
from contextlib import redirect_stdout

from dotenv import load_dotenv
from pymongo import MongoClient

from utils.comparison import Expect
import examples.ai_integrations.langchain.chat_history as chat_history


class TestChatHistory(unittest.TestCase):
    CONNECTION_STRING = None
    client = None

    @classmethod
    def setUpClass(cls):
        load_dotenv()
        TestChatHistory.CONNECTION_STRING = os.getenv("CONNECTION_STRING")

        if TestChatHistory.CONNECTION_STRING is None:
            raise Exception(
                "Could not retrieve CONNECTION_STRING - make sure you have created "
                "the .env file at the root of the PyMongo directory and the variable "
                "is correctly named as CONNECTION_STRING."
            )
        try:
            TestChatHistory.client = MongoClient(TestChatHistory.CONNECTION_STRING)
        except Exception:
            raise Exception(
                "CONNECTION_STRING invalid - make sure your connection string in "
                "your .env file matches the one for your MongoDB deployment."
            )

    def setUp(self):
        TestChatHistory.client.drop_database("langchain_db")

    def test_add_messages_persists_both_messages(self):
        """Chat History: should store the user and AI messages in the collection."""
        chat_history.add_messages(TestChatHistory.CONNECTION_STRING)

        count = TestChatHistory.client["langchain_db"][
            "chat_history"
        ].count_documents({})
        self.assertEqual(count, 2)

    def test_add_messages_uses_session_id(self):
        """Chat History: should tag stored messages with the session identifier."""
        chat_history.add_messages(TestChatHistory.CONNECTION_STRING)

        doc = TestChatHistory.client["langchain_db"]["chat_history"].find_one({})
        self.assertEqual(doc["SessionId"], "chat-session-1")

    def test_get_messages_returns_human_then_ai(self):
        """Chat History: should return the messages in insertion order."""
        from langchain_core.messages import AIMessage, HumanMessage

        messages = chat_history.get_messages(TestChatHistory.CONNECTION_STRING)

        self.assertEqual(len(messages), 2)
        self.assertIsInstance(messages[0], HumanMessage)
        self.assertIsInstance(messages[1], AIMessage)
        self.assertEqual(messages[0].content, "Hello")
        self.assertEqual(messages[1].content, "Hi")

    def test_get_messages_output_matches_expected(self):
        """Chat History: should print the stored messages as shown in the docs."""
        buffer = io.StringIO()
        with redirect_stdout(buffer):
            chat_history.get_messages(TestChatHistory.CONNECTION_STRING)

        Expect.that(buffer.getvalue()).should_match(
            "examples/ai_integrations/langchain/chat-history-output.txt"
        )

    @classmethod
    def tearDownClass(cls):
        if cls.client is not None:
            cls.client.drop_database("langchain_db")
            cls.client.close()
