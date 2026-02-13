"""
Tests for Secondary Indexes on Time Series Collections

This module tests the secondary_indexes.py example to verify that
the output matches the expected documentation examples.
"""

import unittest
import os
from pathlib import Path
from dotenv import load_dotenv
from pymongo import MongoClient

import examples.timeseries.secondary_indexes as secondary_indexes
from utils.comparison import Expect


class TestSecondaryIndexes(unittest.TestCase):
    """Test the secondary indexes example for time series collections."""

    CONNECTION_STRING = None
    client = None

    @classmethod
    def setUpClass(cls):
        load_dotenv()
        TestSecondaryIndexes.CONNECTION_STRING = os.getenv("CONNECTION_STRING")

        if TestSecondaryIndexes.CONNECTION_STRING is None:
            raise Exception(
                "Could not retrieve CONNECTION_STRING - make sure you have created "
                "the .env file at the root of the PyMongo directory and the variable "
                "is correctly named as CONNECTION_STRING."
            )
        try:
            TestSecondaryIndexes.client = MongoClient(TestSecondaryIndexes.CONNECTION_STRING)
        except Exception:
            raise Exception(
                "CONNECTION_STRING invalid - make sure your connection string in your "
                ".env file matches the one for your MongoDB deployment."
            )

    def test_secondary_index(self):
        """Tests CreateSecondaryIndex and UseSecondaryIndex output matches the expected documentation examples."""
        result = secondary_indexes.create_and_use_secondary_index()

        # Get the path to the output file
        output_file = Path(__file__).parent.parent.parent / "examples" / "timeseries" / "ts-secondary-index-output.txt"

        # Verify the result matches expected output (ignoring _id field)
        Expect.that(result["result"]).with_ignored_fields("_id").should_match(str(output_file))

        # Get the path to the explain output file
        explain_output_file = Path(__file__).parent.parent.parent / "examples" / "timeseries" / "ts-secondary-index-explain-output.txt"

        # Verify the explain result using schema validation
        Expect.that(result["explain_result"]).should_resemble(str(explain_output_file)).with_schema({
            "count": 1,
            "required_fields": ["stages[0].$cursor.queryPlanner.winningPlan.stage"],
            "field_values": {
                "stages[0].$cursor.queryPlanner.winningPlan.stage": "CLUSTERED_IXSCAN"
            }
        })

    @classmethod
    def tearDownClass(cls):
        secondary_indexes.cleanup()


if __name__ == "__main__":
    unittest.main()

