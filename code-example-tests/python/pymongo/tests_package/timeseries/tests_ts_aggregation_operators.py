import unittest
from utils.comparison import Expect
import examples.timeseries.aggregation_operators as aggregation_operators
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


    def test_pipeline_average_price(self):
        """Time Series test aggregation pipeline average price."""
        aggregation_operators.load_sample_data(TestTimeseries.CONNECTION_STRING)
        pipeline_average_price_output = aggregation_operators.pipeline_average_price(
            TestTimeseries.CONNECTION_STRING
        )
        expected_output_filepath = (
            "examples/timeseries/ts-pipeline-average-price-output.txt"
        )
        Expect.that(pipeline_average_price_output).should_match(expected_output_filepath)

    def test_pipeline_rolling_average(self):
        """Time Series test aggregation pipeline rolling average."""
        aggregation_operators.load_sample_data(TestTimeseries.CONNECTION_STRING)
        
        pipeline_rolling_average_output = aggregation_operators.pipeline_rolling_average(
            TestTimeseries.CONNECTION_STRING
        )
        expected_timefield_output_filepath = (
            "examples/timeseries/ts-pipeline-rolling-average-output.txt"
        )
        Expect.that(pipeline_rolling_average_output).with_ignored_fields('_id').should_match(expected_timefield_output_filepath)

    @classmethod
    def tearDownClass(cls):
        TestTimeseries.client.close()
