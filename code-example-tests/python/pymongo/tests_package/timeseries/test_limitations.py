import unittest
import os
from dotenv import load_dotenv
from pymongo import MongoClient
import examples.timeseries.limitations as limitations


class TestLimitations(unittest.TestCase):
    CONNECTION_STRING = None
    client = None

    @classmethod
    def setUpClass(cls):
        load_dotenv()
        TestLimitations.CONNECTION_STRING = os.getenv("CONNECTION_STRING")

        if TestLimitations.CONNECTION_STRING is None:
            raise Exception(
                "Could not retrieve CONNECTION_STRING - make sure you have created the .env file at the root of the PyMongo directory and the variable is correctly named as CONNECTION_STRING."
            )
        try:
            TestLimitations.client = MongoClient(TestLimitations.CONNECTION_STRING)
        except:
            raise Exception(
                "CONNECTION_STRING invalid - make sure your connection string in your .env file matches the one for your MongoDB deployment."
            )

    def test_get_distinct_documents(self):
        """Should return distinct meta.type values for project 10."""
        result = limitations.get_distinct_documents()

        # Should return 2 documents (type 'a' and 'b' for project 10)
        self.assertEqual(len(result), 2)

        # Extract the _id values (which are the distinct meta.type values)
        types = sorted([doc["_id"] for doc in result])
        self.assertEqual(types, ["a", "b"])

    @classmethod
    def tearDownClass(cls):
        limitations.cleanup()

