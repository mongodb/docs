import unittest
from utils.comparison import Expect
import examples.timeseries.migrate_with_aggregation as migrate_with_aggregation
import os
from dotenv import load_dotenv
from pymongo import MongoClient
import pprint


class TestTimeseries(unittest.TestCase):
    CONNECTION_STRING = None
    client = None

    @classmethod
    def setUpClass(cls):
        load_dotenv()
        TestTimeseries.CONNECTION_STRING = os.getenv("CONNECTION_STRING")

        if TestTimeseries.CONNECTION_STRING is None:
            raise Exception(
                "Could not retrieve CONNECTION_STRING - make sure you have created the .env file at the root of the PyMongo directory and the variable is correctly named as CONNECTION_STRING."
            )
        try:
            TestTimeseries.client = MongoClient(TestTimeseries.CONNECTION_STRING)
        except:
            raise Exception(
                "CONNECTION_STRING invalid - make sure your connection string in your .env file matches the one for your MongoDB deployment."
            )

    # Drop the database after each test to ensure clean test state
    def tearDown(self):
        TestTimeseries.client.drop_database("mydatabase")

    def test_migrate_with_aggregation(self):
        """Should migrate data to a time series collection with aggregation and return matching document."""
        migrate_with_aggregation.load_sample_data(TestTimeseries.CONNECTION_STRING)
        migrate_with_aggregation.migrate_data(TestTimeseries.CONNECTION_STRING)
        result = migrate_with_aggregation.query_new_ts_collection(TestTimeseries.CONNECTION_STRING)
        output_filepath = "examples/timeseries/ts-migrate-with-aggregation-output.txt"
        Expect.that(result).should_match(output_filepath)
