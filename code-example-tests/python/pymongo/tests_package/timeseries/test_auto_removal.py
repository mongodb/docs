"""
Tests for Auto Removal on Time Series Collections

This module tests the auto_removal.py example to verify that
automatic data removal can be configured on time series collections.
"""

import unittest
import os
from dotenv import load_dotenv
from pymongo import MongoClient

import examples.timeseries.auto_removal as auto_removal
from utils.comparison import Expect


class TestAutoRemoval(unittest.TestCase):
    """Test the auto removal example for time series collections."""

    CONNECTION_STRING = None
    client = None

    @classmethod
    def setUpClass(cls):
        load_dotenv()
        TestAutoRemoval.CONNECTION_STRING = os.getenv("CONNECTION_STRING")

        if TestAutoRemoval.CONNECTION_STRING is None:
            raise Exception(
                "Could not retrieve CONNECTION_STRING - make sure you have created "
                "the .env file at the root of the PyMongo directory and the variable "
                "is correctly named as CONNECTION_STRING."
            )
        try:
            TestAutoRemoval.client = MongoClient(TestAutoRemoval.CONNECTION_STRING)
        except Exception:
            raise Exception(
                "CONNECTION_STRING invalid - make sure your connection string in your "
                ".env file matches the one for your MongoDB deployment."
            )

    def tearDown(self):
        auto_removal.cleanup()

    def test_collection_options_update(self):
        """Tests that collection options can be updated successfully."""
        result = auto_removal.update_collection_options()

        Expect.that(result).should_resemble({"ok": 1.0}).with_schema({
            "count": 1,
            "required_fields": ["ok"],
            "field_values": {"ok": 1.0}
        })

    def test_collection_expiry(self):
        """Tests that the collection expiry is correctly set."""
        result = auto_removal.get_collection_info()
        Expect.that(result).should_match(86400)

    def test_remove_removal(self):
        """Tests that expireAfterSeconds can be removed."""
        result = auto_removal.remove_removal()
        Expect.that(result).should_match(True)

    @classmethod
    def tearDownClass(cls):
        auto_removal.cleanup()


if __name__ == "__main__":
    unittest.main()

