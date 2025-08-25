// Access the encrypted key in the keystore, decrypt it with the secret,
// and use it to open and read from the realm again
public byte[] getExistingKey() {
    // open a connection to the android keystore
    KeyStore keyStore;
    try {
        keyStore = KeyStore.getInstance("AndroidKeyStore");
        keyStore.load(null);
    } catch (KeyStoreException | NoSuchAlgorithmException
            | CertificateException | IOException e) {
        Log.e("EXAMPLE", "Failed to open the keystore.");
        throw new RuntimeException(e);
    }

    // access the encrypted key that's stored in shared preferences
    byte[] initializationVectorAndEncryptedKey = Base64.decode(activity
            .getSharedPreferences("realm_key", Context.MODE_PRIVATE)
            .getString("iv_and_encrypted_key", null), Base64.DEFAULT);
    ByteBuffer buffer = ByteBuffer.wrap(initializationVectorAndEncryptedKey);
    buffer.order(ByteOrder.BIG_ENDIAN);

    // extract the length of the initialization vector from the buffer
    int initializationVectorLength = buffer.getInt();
    // extract the initialization vector based on that length
    byte[] initializationVector = new byte[initializationVectorLength];
    buffer.get(initializationVector);
    // extract the encrypted key
    byte[] encryptedKey = new byte[initializationVectorAndEncryptedKey.length
            - Integer.BYTES
            - initializationVectorLength];
    buffer.get(encryptedKey);

    // create a cipher that uses AES encryption to decrypt our key
    Cipher cipher;
    try {
        cipher = Cipher.getInstance(KeyProperties.KEY_ALGORITHM_AES
                + "/" + KeyProperties.BLOCK_MODE_CBC
                + "/" + KeyProperties.ENCRYPTION_PADDING_PKCS7);
    } catch (NoSuchAlgorithmException | NoSuchPaddingException e) {
        Log.e("EXAMPLE", "Failed to create cipher.");
        throw new RuntimeException(e);
    }

    // decrypt the encrypted key with the secret key stored in the keystore
    byte[] decryptedKey;
    try {
        final SecretKey secretKey =
                (SecretKey) keyStore.getKey("realm_key", null);
        final IvParameterSpec initializationVectorSpec =
                new IvParameterSpec(initializationVector);
        cipher.init(Cipher.DECRYPT_MODE, secretKey, initializationVectorSpec);
        decryptedKey = cipher.doFinal(encryptedKey);
    } catch (InvalidKeyException e) {
        Log.e("EXAMPLE", "Failed to decrypt. Invalid key.");
        throw new RuntimeException(e);
    } catch (UnrecoverableKeyException | NoSuchAlgorithmException
            | BadPaddingException | KeyStoreException
            | IllegalBlockSizeException | InvalidAlgorithmParameterException e) {
        Log.e("EXAMPLE",
                "Failed to decrypt the encrypted realm key with the secret key.");
        throw new RuntimeException(e);
    }
    return decryptedKey; // pass to a realm configuration via encryptionKey()
}
