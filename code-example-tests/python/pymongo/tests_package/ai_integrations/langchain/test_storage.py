import io
import os
import unittest
from contextlib import redirect_stdout

from dotenv import load_dotenv
from pymongo import MongoClient

from utils.comparison import Expect
import examples.ai_integrations.langchain.storage as storage


class TestStorage(unittest.TestCase):
    CONNECTION_STRING = None
    client = None

    @classmethod
    def setUpClass(cls):
        load_dotenv()
        TestStorage.CONNECTION_STRING = os.getenv("CONNECTION_STRING")

        if TestStorage.CONNECTION_STRING is None:
            raise Exception(
                "Could not retrieve CONNECTION_STRING - make sure you have created "
                "the .env file at the root of the PyMongo directory and the variable "
                "is correctly named as CONNECTION_STRING."
            )
        try:
            TestStorage.client = MongoClient(TestStorage.CONNECTION_STRING)
        except Exception:
            raise Exception(
                "CONNECTION_STRING invalid - make sure your connection string in "
                "your .env file matches the one for your MongoDB deployment."
            )

    def setUp(self):
        TestStorage.client.drop_database("langchain_db")

    def test_create_document_store_returns_docstore(self):
        """Document Store: should return a MongoDBDocStore for the given namespace."""
        from langchain_mongodb.docstores import MongoDBDocStore

        docstore = storage.create_document_store(TestStorage.CONNECTION_STRING)

        self.assertIsInstance(docstore, MongoDBDocStore)

    def test_document_store_round_trips_values(self):
        """Document Store: should return the documents that were stored."""
        from langchain_core.documents import Document

        docstore = storage.create_document_store(TestStorage.CONNECTION_STRING)

        docstore.mset(
            [
                ("k1", Document(page_content="first")),
                ("k2", Document(page_content="second")),
            ]
        )

        retrieved = docstore.mget(["k1", "k2"])
        self.assertEqual([doc.page_content for doc in retrieved], ["first", "second"])

    def test_document_store_deletes_keys(self):
        """Document Store: should return None for keys that were deleted."""
        from langchain_core.documents import Document

        docstore = storage.create_document_store(TestStorage.CONNECTION_STRING)
        docstore.mset([("k1", Document(page_content="first"))])

        docstore.mdelete(["k1"])

        self.assertEqual(docstore.mget(["k1"]), [None])

    def test_create_byte_store_returns_stored_bytes(self):
        """Binary Storage: should return the byte values that were stored."""
        values = storage.create_byte_store(TestStorage.CONNECTION_STRING)

        self.assertEqual(values, [b"hello", b"world"])

    def test_create_byte_store_output_matches_expected(self):
        """Binary Storage: should print the stored values and then the keys."""
        buffer = io.StringIO()
        with redirect_stdout(buffer):
            storage.create_byte_store(TestStorage.CONNECTION_STRING)

        Expect.that(buffer.getvalue()).should_match(
            "examples/ai_integrations/langchain/binary-storage-output.txt"
        )

    def test_create_byte_store_deletes_keys(self):
        """Binary Storage: should leave the collection empty after deleting keys."""
        storage.create_byte_store(TestStorage.CONNECTION_STRING)

        count = TestStorage.client["langchain_db"]["byte_store"].count_documents({})
        self.assertEqual(count, 0)

    @classmethod
    def tearDownClass(cls):
        if cls.client is not None:
            cls.client.drop_database("langchain_db")
            cls.client.close()
