import unittest
import examples.example_stub as example_stub
import os
from dotenv import load_dotenv
from pymongo import MongoClient

class TestExampleStub(unittest.TestCase):
    CONNECTION_STRING = None
    client = None

    @classmethod
    def setUpClass(cls):
        load_dotenv()
        TestExampleStub.CONNECTION_STRING = os.getenv("CONNECTION_STRING")

        if TestExampleStub.CONNECTION_STRING is None:
            raise Exception("Could not retrieve CONNECTION_STRING - make sure you have created the .env file at the root of the PyMongo directory and the variable is correctly named as CONNECTION_STRING.")
        try:
            TestExampleStub.client = MongoClient(TestExampleStub.CONNECTION_STRING) 
        except:
            raise Exception("CONNECTION_STRING invalid - make sure your connection string in your .env file matches the one for your MongoDB deployment.")
    
    def setUp(self):
        TestExampleStub.client.drop_database("db_name")

    def test_stub(self):
        print("----------Test Stub: should ... ----------")

        expected_return = "query results"
        actual_return = example_stub.example(TestExampleStub.CONNECTION_STRING)
        self.assertEqual(expected_return, actual_return)
        # For more details on how to validate an example, see the README

        print("----------Test complete----------")

    @classmethod
    def tearDownClass(cls):
        TestExampleStub.client.close()