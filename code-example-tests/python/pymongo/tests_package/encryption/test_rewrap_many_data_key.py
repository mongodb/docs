import os
import unittest
from dotenv import load_dotenv
from bson.binary import STANDARD
from bson.codec_options import CodecOptions
from pymongo import MongoClient
from pymongo.encryption import ClientEncryption
from utils.comparison import Expect

import examples.encryption.rewrap_many_data_key as rewrap_many_data_key


class TestRewrapManyDataKey(unittest.TestCase):
    CONNECTION_STRING = None
    client = None
    KEY_VAULT_DB = "encryption"
    KEY_VAULT_COLLECTION = "__keyVault"
    DATA_KEY_ALT_NAME = "my-key"

    @classmethod
    def setUpClass(cls):
        load_dotenv()
        TestRewrapManyDataKey.CONNECTION_STRING = os.getenv("CONNECTION_STRING")

        if TestRewrapManyDataKey.CONNECTION_STRING is None:
            raise Exception(
                "Could not retrieve CONNECTION_STRING - make sure you have created the .env file at the root of the PyMongo directory and the variable is correctly named as CONNECTION_STRING."
            )
        try:
            TestRewrapManyDataKey.client = MongoClient(
                TestRewrapManyDataKey.CONNECTION_STRING
            )
        except:
            raise Exception(
                "CONNECTION_STRING invalid - make sure your connection string in your .env file matches the one for your MongoDB deployment."
            )

    def setUp(self):
        TestRewrapManyDataKey.client.drop_database(self.KEY_VAULT_DB)
        self.master_key = os.urandom(96)
        self.kms_providers = {"local": {"key": self.master_key}}
        self.key_vault_namespace = f"{self.KEY_VAULT_DB}.{self.KEY_VAULT_COLLECTION}"
        self.key_vault = TestRewrapManyDataKey.client[self.KEY_VAULT_DB][
            self.KEY_VAULT_COLLECTION
        ]

    def _create_data_key(self):
        client_encryption = ClientEncryption(
            self.kms_providers,
            self.key_vault_namespace,
            TestRewrapManyDataKey.client,
            CodecOptions(uuid_representation=STANDARD),
        )
        client_encryption.create_data_key(
            "local", key_alt_names=[self.DATA_KEY_ALT_NAME]
        )

    def _get_data_key(self):
        return self.key_vault.find_one({"keyAltNames": self.DATA_KEY_ALT_NAME})

    def test_rewrap_data_keys(self):
        """Rewrap Many Data Key: should rewrap a matching DEK with new key material while preserving its ID."""
        self._create_data_key()
        original_data_key = self._get_data_key()

        result = rewrap_many_data_key.rewrap_data_keys(
            TestRewrapManyDataKey.CONNECTION_STRING,
            self.kms_providers,
            self.key_vault_namespace,
        )

        rewrapped_data_key = self._get_data_key()

        Expect.that(result.bulk_write_result.matched_count).should_match(1)
        Expect.that(rewrapped_data_key["_id"]).should_match(original_data_key["_id"])
        Expect.that(
            rewrapped_data_key["keyMaterial"] != original_data_key["keyMaterial"]
        ).should_match(True)

    def tearDown(self):
        TestRewrapManyDataKey.client.drop_database(self.KEY_VAULT_DB)

    @classmethod
    def tearDownClass(cls):
        TestRewrapManyDataKey.client.close()
