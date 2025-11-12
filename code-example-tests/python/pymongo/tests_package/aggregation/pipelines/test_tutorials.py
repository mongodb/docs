import unittest
from utils.comparison import Expect
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
            raise Exception(
                "Could not retrieve CONNECTION_STRING - make sure you have created the .env file at the root of the PyMongo directory and the variable is correctly named as CONNECTION_STRING."
            )
        try:
            TestTutorialApp.client = MongoClient(TestTutorialApp.CONNECTION_STRING)
        except:
            raise Exception(
                "CONNECTION_STRING invalid - make sure your connection string in your .env file matches the one for your MongoDB deployment."
            )

    def setUp(self):
        TestTutorialApp.client.drop_database("agg_tutorials_db")

    def test_app_functionality(self):
        """Sample App: Should connect to db and perform delete, insert, and aggregate operations successfully."""
        # results is a list of documents found by the aggregation
        results = tutorial_app.example(TestTutorialApp.CONNECTION_STRING)
        self.assertEqual(1, len(results), "there should only be one document filtered")

        output_data = [{"_id": "filterItem", "name": "filterItem"}]
        Expect.that(results).should_match(output_data)

    def test_filter_tutorial(self):
        """Filter tutorial: should insert sample data and return 3 specified documents by filter."""
        with redirect_stdout(io.StringIO()) as stdout:
            filter_tutorial.example(TestTutorialApp.CONNECTION_STRING)
        actual_output = stdout.getvalue()

        output_filepath = (
            "examples/aggregation/pipelines/filter/filter-tutorial-output.txt"
        )
        Expect.that(actual_output).should_match(output_filepath)

    def test_group_tutorial(self):
        """Group tutorial: should insert sample data and return 3 docs grouped by 'first_purchase_date'."""
        with redirect_stdout(io.StringIO()) as stdout:
            group_tutorial.example(TestTutorialApp.CONNECTION_STRING)
        actual_output = stdout.getvalue()

        output_filepath = (
            "examples/aggregation/pipelines/group/group-tutorial-output.txt"
        )
        Expect.that(actual_output).should_match(output_filepath)

    def test_unwind_tutorial(self):
        """Unwind tutorial: should insert sample data and unwind product data to return 4 documents grouped by ID."""
        with redirect_stdout(io.StringIO()) as stdout:
            unwind_tutorial.example(TestTutorialApp.CONNECTION_STRING)
        actual_output = stdout.getvalue()

        output_filepath = (
            "examples/aggregation/pipelines/unwind/unwind-tutorial-output.txt"
        )
        Expect.that(actual_output).should_match(output_filepath)

    def test_one_to_one_tutorial(self):
        """One-to-one join tutorial: should insert sample data and return 3 docs w/product and order data joined."""
        with redirect_stdout(io.StringIO()) as stdout:
            one_to_one_tutorial.example(TestTutorialApp.CONNECTION_STRING)
        actual_output = stdout.getvalue()

        output_filepath = (
            "examples/aggregation/pipelines/join/one-to-one-tutorial-output.txt"
        )
        Expect.that(actual_output).should_match(output_filepath)

    def test_multi_field_tutorial(self):
        """Multi-field join tutorial: should insert sample data and return 2 docs w/product and order data joined by multiple fields."""
        with redirect_stdout(io.StringIO()) as stdout:
            multi_field_tutorial.example(TestTutorialApp.CONNECTION_STRING)
        actual_output = stdout.getvalue()

        output_filepath = (
            "examples/aggregation/pipelines/join/multi-field-tutorial-output.txt"
        )
        Expect.that(actual_output).should_match(output_filepath)

    @classmethod
    def tearDownClass(cls):
        TestTutorialApp.client.close()
