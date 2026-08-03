import unittest
import os
from dotenv import load_dotenv
from pymongo import AsyncMongoClient
from utils.comparison import Expect
import examples.custom_types.type_codecs.aggregate_async as aggregate_async


class TestAggregateAsync(unittest.IsolatedAsyncioTestCase):
    CONNECTION_STRING = None

    @classmethod
    def setUpClass(cls):
        load_dotenv()
        TestAggregateAsync.CONNECTION_STRING = os.getenv("CONNECTION_STRING")

        if TestAggregateAsync.CONNECTION_STRING is None:
            raise Exception(
                "Could not retrieve CONNECTION_STRING - make sure you have created the .env file at the root of the PyMongo directory and the variable is correctly named as CONNECTION_STRING."
            )

    # Drop the collection after each test to ensure clean test state.
    async def asyncTearDown(self):
        client = AsyncMongoClient(TestAggregateAsync.CONNECTION_STRING)
        await client["test"].drop_collection("custom_status_example")
        await client.close()

    async def test_aggregate_matches_encoded_status(self):
        """Custom type async aggregate test: should match documents whose encoded status is active."""
        results = await aggregate_async.example(TestAggregateAsync.CONNECTION_STRING)

        # The encoder converts Status.ACTIVE to "active", so $match returns
        # the two ACTIVE documents (_id 1 and 3). Order isn't guaranteed.
        output_filepath = "examples/custom_types/type_codecs/aggregate_async_output.txt"
        Expect.that(results).with_unordered_sort().should_match(output_filepath)
