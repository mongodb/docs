import unittest
from utils.comparison import Expect
import examples.timeseries.ts_create_and_query as ts_create_and_query
import os
from dotenv import load_dotenv
from pymongo import MongoClient

class TestTimeseriesCreateAndQuery(unittest.TestCase):
    CONNECTION_STRING = None
    client = None

    @classmethod
    def setUpClass(cls):
        load_dotenv()
        TestTimeseriesCreateAndQuery.CONNECTION_STRING = os.getenv("CONNECTION_STRING")

        if TestTimeseriesCreateAndQuery.CONNECTION_STRING is None:
            raise Exception(
                "Could not retrieve CONNECTION_STRING - make sure you have created the .env file at the root of the PyMongo directory and the variable is correctly named as CONNECTION_STRING.")
        try:
            TestTimeseriesCreateAndQuery.client = MongoClient(TestTimeseriesCreateAndQuery.CONNECTION_STRING)
        except:
            raise Exception(
                "CONNECTION_STRING invalid - make sure your connection string in your .env file matches the one for your MongoDB deployment.")

    def test_connect_with_expire_after_seconds(self):
        print("----------Create collection test: should create timeseries collection with specified settings----------")
        ts_create_and_query.create_collection(TestTimeseriesCreateAndQuery.CONNECTION_STRING)
        self.assertTrue("weather" in TestTimeseriesCreateAndQuery.client["timeseries"].list_collection_names())
        settings = TestTimeseriesCreateAndQuery.client["timeseries"]["weather"].options()
        self.assertEqual(settings["timeseries"]["timeField"], "time")
        self.assertEqual(settings["timeseries"]["metaField"], "sensor")
        self.assertEqual(settings["timeseries"]["granularity"], "hours")
        self.assertEqual(settings["expireAfterSeconds"], 86400)
        print("----------Test complete----------")

    def test_connect_with_bucket_settings(self):
        print("----------Create collection test: should create timeseries collection with bucket settings----------")
        ts_create_and_query.create_collection_with_bucket(TestTimeseriesCreateAndQuery.CONNECTION_STRING)
        self.assertTrue("weather" in TestTimeseriesCreateAndQuery.client["timeseries"].list_collection_names())
        settings = TestTimeseriesCreateAndQuery.client["timeseries"]["weather"].options()
        self.assertEqual(settings["timeseries"]["timeField"], "time")
        self.assertEqual(settings["timeseries"]["metaField"], "sensor")
        self.assertEqual(settings["timeseries"]["bucketMaxSpanSeconds"], 3600)
        self.assertEqual(settings["timeseries"]["bucketRoundingSeconds"], 3600)
        self.assertEqual(settings["expireAfterSeconds"], 86400)
        print("----------Test complete----------")

    def test_ts_query(self):
        print("----------Query test: should query timeseries collection and match----------")
        ts_create_and_query.create_collection(TestTimeseriesCreateAndQuery.CONNECTION_STRING)
        ts_create_and_query.load_sample_data(TestTimeseriesCreateAndQuery.CONNECTION_STRING)
        result = ts_create_and_query.query_collection(TestTimeseriesCreateAndQuery.CONNECTION_STRING)
        output_filepath = "examples/timeseries/ts-create-and-query-output.txt"
        Expect.that(result).should_match(output_filepath)
        print("----------Test complete----------")

    def test_ts_aggregate(self):
        print("----------Aggregate test: should run agg pipeline on timeseries collection and match----------")
        ts_create_and_query.create_collection(TestTimeseriesCreateAndQuery.CONNECTION_STRING)
        ts_create_and_query.load_sample_data(TestTimeseriesCreateAndQuery.CONNECTION_STRING)
        result = ts_create_and_query.run_aggregation(TestTimeseriesCreateAndQuery.CONNECTION_STRING)
        output_filepath = "examples/timeseries/ts-create-and-query-aggregation-output.txt"
        Expect.that(result).should_match(output_filepath)
        print("----------Test complete----------")

    def tearDown(self):
        TestTimeseriesCreateAndQuery.client.drop_database("timeseries")

    @classmethod
    def tearDownClass(cls):
        TestTimeseriesCreateAndQuery.client.close()
