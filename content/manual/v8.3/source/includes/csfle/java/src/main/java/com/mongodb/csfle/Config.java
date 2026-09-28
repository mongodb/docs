package com.mongodb.csfle;

import java.io.FileInputStream;
import java.util.HashMap;
import java.util.Map;

public class Config {
    public static final String CONNECTION_STRING = "<connection string>";
    public static final String KEY_VAULT_DB = "encryption";
    public static final String KEY_VAULT_COLL = "__keyVault";
    public static final String KEY_VAULT_NAMESPACE =
        KEY_VAULT_DB + "." + KEY_VAULT_COLL;
    public static final String MASTER_KEY_PATH = "master-key.txt";
    public static final String DEK_ID_PATH = "dek_id.txt";
    public static final String CRYPT_SHARED_LIB_PATH =
        "<Automatic Encryption Shared Library path>";

    public static Map<String, Map<String, Object>> getKmsProviders()
            throws Exception {
        byte[] localMasterKey = new byte[96];
        try (FileInputStream fis = new FileInputStream(MASTER_KEY_PATH)) {
            if (fis.read(localMasterKey) < 96) {
                throw new Exception(
                    "Expected 96 bytes from master key file");
            }
        }
        Map<String, Object> keyMap = new HashMap<>();
        keyMap.put("key", localMasterKey);
        Map<String, Map<String, Object>> kmsProviders = new HashMap<>();
        kmsProviders.put("local", keyMap);
        return kmsProviders;
    }
}
