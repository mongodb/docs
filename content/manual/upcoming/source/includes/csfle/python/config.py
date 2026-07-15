"""
Configuration for CSFLE example scripts.
"""

# MongoDB connection string
connection_string = "<connection string>"

# Database that contains the key vault collection
key_vault_db = "encryption"

# Collection that stores your data encryption keys
key_vault_coll = "__keyVault"

# Namespace that stores your data encryption keys
key_vault_namespace = f"{key_vault_db}.{key_vault_coll}"

# File path for your local Customer Master Key
master_key_path = "master-key.txt"

# File path for your data encryption key
dek_id_path = "dek_id.txt"

# Shared library path for CSFLE
crypt_shared_lib_path = "<Automatic Encryption Shared Library path>"

def get_kms_providers():
    """Load and return KMS providers with the local master key."""
    import os
    with open(master_key_path, "rb") as f:
        local_master_key = f.read()
    return {
        "local": {
            "key": local_master_key
        },
    }
