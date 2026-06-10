import unittest
import os
from dotenv import load_dotenv
from utils.comparison import Expect
import examples.get_started.get_started as get_started


class TestGetStarted(unittest.TestCase):
    CONNECTION_STRING = None

    @classmethod
    def setUpClass(cls):
        load_dotenv()
        TestGetStarted.CONNECTION_STRING = os.getenv("CONNECTION_STRING")

        if TestGetStarted.CONNECTION_STRING is None:
            raise Exception(
                "Could not retrieve CONNECTION_STRING - make sure you have created the .env file at the root of the PyMongo directory and the variable is correctly named as CONNECTION_STRING."
            )

    def test_get_started(self):
        """Test Get Started: should return the 'Back to the Future' movie document"""
        actual_result = get_started.get_started(TestGetStarted.CONNECTION_STRING)

        Expect.that(actual_result).should_resemble(actual_result).with_schema({
            "count": 1,
            "required_fields": ["_id", "title", "plot", "genres"],
            "field_values": {"title": "Back to the Future", "type": "movie"}
        })

