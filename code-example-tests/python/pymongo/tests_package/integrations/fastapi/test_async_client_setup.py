import unittest
import os
from dotenv import load_dotenv
from utils.comparison import Expect
import examples.integrations.fastapi.async_client_setup as fastapi_connect


class TestFastAPIAsyncClientSetup(unittest.IsolatedAsyncioTestCase):
    CONNECTION_STRING = None

    @classmethod
    def setUpClass(cls):
        load_dotenv()
        TestFastAPIAsyncClientSetup.CONNECTION_STRING = os.getenv("CONNECTION_STRING")
        if TestFastAPIAsyncClientSetup.CONNECTION_STRING is None:
            raise Exception(
                "Could not retrieve CONNECTION_STRING - make sure you have created "
                "the .env file at the root of the PyMongo directory and the variable "
                "is correctly named as CONNECTION_STRING."
            )

    async def test_async_client_setup(self):
        """FastAPI Integration: async client should connect to college database."""
        result = await fastapi_connect.async_client_setup(
            TestFastAPIAsyncClientSetup.CONNECTION_STRING
        )
        Expect.that(result).should_match(
            {"db_name": "college", "collection_name": "students"}
        )
