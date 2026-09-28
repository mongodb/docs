import os

from pymongo import MongoClient
from pymongo.encryption import Algorithm, ClientEncryption
from pymongo.encryption_options import AutoEncryptionOpts


def main():

    local_master_key = os.urandom(96)
    kms_providers = {"local": {"key": local_master_key}}

    your_connection_uri = "localhost:27017"
    # start_mongoclient
    client = MongoClient(your_connection_uri)
    # end_mongoclient

    # start_client_enc
    coll = client.employees.foods
    client_encryption = ClientEncryption(
        kms_providers,
        "encryption.___keyVault",
        client,
        coll.codec_options,
    )
    # end_client_enc

    refreshKeyVault(client)
    # Create a new data key and json schema for the encryptedField.
    data_key_id = client_encryption.create_data_key(
        "local", key_alt_names=["pymongo_encryption_example_3"]
    )

    # start_enc_and_insert
    encrypted_name = client_encryption.encrypt(
        "Greg",
        Algorithm.AEAD_AES_256_CBC_HMAC_SHA_512_Deterministic,
        key_id=data_key_id,
    )
    encrypted_foods = client_encryption.encrypt(
        ["Cheese", "Grapes"],
        Algorithm.AEAD_AES_256_CBC_HMAC_SHA_512_Random,
        key_id=data_key_id,
    )
    coll.insert_one({"name": encrypted_name, "age": 83, "foods": encrypted_foods})
    # end_enc_and_insert

    # start_find_decrypt
    name_to_query = "Greg"
    encrypted_name_to_query = client_encryption.encrypt(
        name_to_query,
        Algorithm.AEAD_AES_256_CBC_HMAC_SHA_512_Deterministic,
        key_id=data_key_id,
    )
    doc = client.employees.foods.find_one({"name": encrypted_name_to_query})
    print("Encrypted document: %s" % (doc,))
    doc["name"] = client_encryption.decrypt(doc["name"])
    doc["foods"] = client_encryption.decrypt(doc["foods"])
    print("Decrypted document: %s" % (doc,))
    # end_find_decrypt

    # cleanup
    coll.drop()
    client_encryption.close()
    client.close()


def getAutoEncClient(kms_providers):

    key_vault_namespace = "encryption.___testKeyVault"
    # start_automatic_enc
    auto_encryption_opts = AutoEncryptionOpts(
        kms_providers=kms_providers,
        key_vault_namespace=key_vault_namespace,
        bypass_auto_encryption=True,
    )
    client = MongoClient(auto_encryption_opts=auto_encryption_opts)
    # end_automatic_enc

    return client


def refreshKeyVault(client):

    key_vault_namespace = "encryption.___testKeyVault"
    key_vault_db_name, key_vault_coll_name = key_vault_namespace.split(".", 1)
    key_vault = client[key_vault_db_name][key_vault_coll_name]
    key_vault.drop()
    key_vault.create_index(
        "keyAltNames",
        unique=True,
        partialFilterExpression={"keyAltNames": {"$exists": True}},
    )


if __name__ == "__main__":
    main()
