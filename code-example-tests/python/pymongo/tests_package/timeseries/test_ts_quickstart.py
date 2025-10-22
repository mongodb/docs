import unittest
from utils.comparison import Expect
import examples.timeseries.ts_quick_start as ts_quick_start
import examples.sample_app as sample_app
import os
from dotenv import load_dotenv
from pymongo import MongoClient


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
        TestTimeseries.client.drop_database("timeseries")

    def test_sample_app(self):
        print(
            "----------Sample app test: should connect to client without errors----------"
        )
        result = sample_app.example(TestTimeseries.CONNECTION_STRING)
        self.assertEqual("Connected successfully", result)
        print("----------Test complete----------")

    def test_quickstart_metafield(self):
        print(
            "----------Time Series quick start test: should metafield query and match----------"
        )
        ts_quick_start.load_sample_data(TestTimeseries.CONNECTION_STRING)
        metafield_query_output = ts_quick_start.metafield_query(
            TestTimeseries.CONNECTION_STRING
        )
        expected_metafield_output_filepath = (
            "examples/timeseries/ts-quick-start-metafield-output.txt"
        )
        Expect.that(metafield_query_output).should_match(expected_metafield_output_filepath)
        print("----------Test complete----------")

    def test_quickstart_timefield(self):
        print(
            "----------Time Series quick start test: should timefield query and match----------"
        )
        ts_quick_start.load_sample_data(TestTimeseries.CONNECTION_STRING)
        timefield_query_output = ts_quick_start.timefield_query(
            TestTimeseries.CONNECTION_STRING
        )
        expected_timefield_output_filepath = (
            "examples/timeseries/ts-quick-start-timefield-output.txt"
        )
        Expect.that(timefield_query_output).should_match(expected_timefield_output_filepath)
        print("----------Test complete----------")

    @classmethod
    def tearDownClass(cls):
        TestTimeseries.client.close()
