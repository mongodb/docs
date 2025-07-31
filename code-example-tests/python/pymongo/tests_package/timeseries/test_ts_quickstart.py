import unittest
import utils.test_helper as test_helper
import examples.timeseries.ts_quick_start as ts_quick_start
import examples.sample_app as sample_app
import os
import io
from contextlib import redirect_stdout
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
            raise Exception("Could not retrieve CONNECTION_STRING - make sure you have created the .env file at the root of the PyMongo directory and the variable is correctly named as CONNECTION_STRING.")
        try:
            TestTimeseries.client = MongoClient(TestTimeseries.CONNECTION_STRING) 
        except:
            raise Exception("CONNECTION_STRING invalid - make sure your connection string in your .env file matches the one for your MongoDB deployment.")
    
    def setUp(self):
        TestTimeseries.client.drop_database("timeseries")
    
    def test_sample_app(self):
        print("----------Sample app test: should connect to client without errors----------")
        result = sample_app.example(TestTimeseries.CONNECTION_STRING)
        self.assertEqual("Connected successfully", result)
        print("----------Test complete----------")

    def test_quickstart(self):
        print("----------Time Series quick start test: should metafield and timefield query and match----------")

        with redirect_stdout(io.StringIO()) as stdout:
            ts_quick_start.example(TestTimeseries.CONNECTION_STRING)
        actual_output = stdout.getvalue()

        output_filepath = "examples/timeseries/ts-quick-start-metafield-output.txt"
        expected_metafield_output = test_helper.get_expected_output(output_filepath)

        output_filepath = "examples/timeseries/ts-quick-start-timefield-output.txt"
        expected_timefield_output = test_helper.get_expected_output(output_filepath)

        # Combine the expected output so that it matches the actual print,
        # which is both of the queries
        expected_output = expected_metafield_output + expected_timefield_output

        self.assertEqual(expected_output, actual_output, "expected != actual")

        print("----------Test complete----------")

    @classmethod
    def tearDownClass(cls):
        TestTimeseries.client.close()