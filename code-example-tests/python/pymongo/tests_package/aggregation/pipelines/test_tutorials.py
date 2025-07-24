import unittest
import utils.test_helper as test_helper
import examples.aggregation.pipelines.filter.filter_tutorial as filter_tutorial
import examples.aggregation.pipelines.tutorial_app as tutorial_app
import examples.aggregation.pipelines.group.group_tutorial as group_tutorial
import examples.aggregation.pipelines.unwind.unwind_tutorial as unwind_tutorial
import examples.aggregation.pipelines.join.one_to_one_tutorial as one_to_one_tutorial
import examples.aggregation.pipelines.join.multi_field_tutorial as multi_field_tutorial
import os
import io
from contextlib import redirect_stdout
from dotenv import load_dotenv
from pymongo import MongoClient

class TestTutorialApp(unittest.TestCase):
    CONNECTION_STRING = None
    client = None

    @classmethod
    def setUpClass(cls):
        load_dotenv()
        TestTutorialApp.CONNECTION_STRING = os.getenv("CONNECTION_STRING")

        # fast fail
        if TestTutorialApp.CONNECTION_STRING is None:
            raise Exception("Could not retrieve CONNECTION_STRING - make sure you have created the .env file at the root of the PyMongo directory and the variable is correctly named as CONNECTION_STRING.")
        try:
            TestTutorialApp.client = MongoClient(TestTutorialApp.CONNECTION_STRING) 
        except:
            raise Exception("CONNECTION_STRING invalid - make sure your connection string in your .env file matches the one for your MongoDB deployment.")

    def setUp(self):
        TestTutorialApp.client.drop_database('agg_tutorials_db')

    def test_app_functionality(self):
        print("----------Test should connect to db and perform delete, insert, and aggregate operations successfully----------")
        
        # results is a list of documents found by the aggregation
        results = tutorial_app.example(TestTutorialApp.CONNECTION_STRING)
        self.assertEqual(1, len(results), "there should only be one document filtered")

        output_data = [ { "_id": "filterItem", "name": "filterItem" } ]
        self.assertEqual(output_data, results, "expected != actual")

        print("----------Test complete----------")
    
    def test_filter_tutorial(self):
        print("----------Test should insert sample data and filter successfully----------")
        
        with redirect_stdout(io.StringIO()) as stdout:
            filter_tutorial.example(TestTutorialApp.CONNECTION_STRING)
        actual_output = stdout.getvalue()

        output_filepath = "examples/aggregation/pipelines/filter/filter-tutorial-output.txt"
        expected_output = test_helper.get_expected_output(output_filepath)

        self.assertEqual(expected_output, actual_output, "expected != actual")

        print("----------Test complete----------")

    def test_group_tutorial(self):
        print("----------Test should insert sample data and group successfully----------")

        with redirect_stdout(io.StringIO()) as stdout:
            group_tutorial.example(TestTutorialApp.CONNECTION_STRING)
        actual_output = stdout.getvalue()

        output_filepath = "examples/aggregation/pipelines/group/group-tutorial-output.txt"
        expected_output = test_helper.get_expected_output(output_filepath)

        self.assertEqual(expected_output, actual_output)

        print("----------Test complete----------")

    def test_unwind_tutorial(self):
        print("----------Test should insert sample data and unwind successfully----------")

        with redirect_stdout(io.StringIO()) as stdout:
            unwind_tutorial.example(TestTutorialApp.CONNECTION_STRING)
        actual_output = stdout.getvalue()

        output_filepath = "examples/aggregation/pipelines/unwind/unwind-tutorial-output.txt"
        expected_output = test_helper.get_expected_output(output_filepath)

        self.assertEqual(expected_output, actual_output)

        print("----------Test complete----------")

    def test_one_to_one_tutorial(self):
        print("----------Test should insert sample data and one to one join successfully----------")

        with redirect_stdout(io.StringIO()) as stdout:
            one_to_one_tutorial.example(TestTutorialApp.CONNECTION_STRING)
        actual_output = stdout.getvalue()

        output_filepath = "examples/aggregation/pipelines/join/one-to-one-tutorial-output.txt"
        expected_output = test_helper.get_expected_output(output_filepath)

        self.assertEqual(expected_output, actual_output)

        print("----------Test complete----------")

    def test_multi_field_tutorial(self):
        print("----------Test should insert sample data and multi field join successfully----------")

        with redirect_stdout(io.StringIO()) as stdout:
            multi_field_tutorial.example(TestTutorialApp.CONNECTION_STRING)
        actual_output = stdout.getvalue()

        output_filepath = "examples/aggregation/pipelines/join/multi-field-tutorial-output.txt"
        expected_output = test_helper.get_expected_output(output_filepath)
        
        self.assertEqual(expected_output, actual_output)

        print("----------Test complete----------")

    @classmethod
    def tearDownClass(cls):
        TestTutorialApp.client.close()