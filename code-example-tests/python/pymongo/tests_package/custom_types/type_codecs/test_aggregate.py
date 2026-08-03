import unittest
import os
from dotenv import load_dotenv
from pymongo import MongoClient
from utils.comparison import Expect
import examples.custom_types.type_codecs.aggregate as aggregate


class TestAggregate(unittest.TestCase):
    CONNECTION_STRING = None
    client = None

    @classmethod
    def setUpClass(cls):
        load_dotenv()
        TestAggregate.CONNECTION_STRING = os.getenv("CONNECTION_STRING")

        if TestAggregate.CONNECTION_STRING is None:
            raise Exception(
                "Could not retrieve CONNECTION_STRING - make sure you have created the .env file at the root of the PyMongo directory and the variable is correctly named as CONNECTION_STRING."
            )
        try:
            TestAggregate.client = MongoClient(TestAggregate.CONNECTION_STRING)
        except Exception:
            raise Exception(
                "CONNECTION_STRING invalid - make sure your connection string in your .env file matches the one for your MongoDB deployment."
            )

    # Drop the collection after each test to ensure clean test state.
    def tearDown(self):
        TestAggregate.client["test"].drop_collection("custom_status_example")

    def test_aggregate_matches_encoded_status(self):
        """Custom type aggregate test: should match documents whose encoded status is active."""
        results = aggregate.example(TestAggregate.CONNECTION_STRING)

        # The encoder converts Status.ACTIVE to "active", so $match returns
        # the two ACTIVE documents (_id 1 and 3). Order isn't guaranteed.
        output_filepath = "examples/custom_types/type_codecs/aggregate_output.txt"
        Expect.that(results).with_unordered_sort().should_match(output_filepath)

    @classmethod
    def tearDownClass(cls):
        TestAggregate.client.close()
