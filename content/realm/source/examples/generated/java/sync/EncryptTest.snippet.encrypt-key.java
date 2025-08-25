// Create a key to encrypt a realm and save it securely in the keystore
public byte[] getNewKey() {
    // open a connection to the android keystore
    KeyStore keyStore;
    try {
        keyStore = KeyStore.getInstance("AndroidKeyStore");
        keyStore.load(null);
    } catch (KeyStoreException | NoSuchAlgorithmException
            | CertificateException | IOException e) {
        Log.v("EXAMPLE", "Failed to open the keystore.");
        throw new RuntimeException(e);
    }

    // create a securely generated random asymmetric RSA key
    byte[] realmKey = new byte[Realm.ENCRYPTION_KEY_LENGTH];
    new SecureRandom().nextBytes(realmKey);

    // create a cipher that uses AES encryption -- we'll use this to encrypt our key
    Cipher cipher;
    try {
        cipher = Cipher.getInstance(KeyProperties.KEY_ALGORITHM_AES
                + "/" + KeyProperties.BLOCK_MODE_CBC
                + "/" + KeyProperties.ENCRYPTION_PADDING_PKCS7);
    } catch (NoSuchAlgorithmException | NoSuchPaddingException e) {
        Log.e("EXAMPLE", "Failed to create a cipher.");
        throw new RuntimeException(e);
    }

    // generate secret key
    KeyGenerator keyGenerator;
    try {
        keyGenerator = KeyGenerator.getInstance(
                KeyProperties.KEY_ALGORITHM_AES,
                "AndroidKeyStore");
    } catch (NoSuchAlgorithmException | NoSuchProviderException e) {
        Log.e("EXAMPLE", "Failed to access the key generator.");
        throw new RuntimeException(e);
    }
    KeyGenParameterSpec keySpec = new KeyGenParameterSpec.Builder(
            "realm_key",
            KeyProperties.PURPOSE_ENCRYPT | KeyProperties.PURPOSE_DECRYPT)
            .setBlockModes(KeyProperties.BLOCK_MODE_CBC)
            .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_PKCS7)
            .setUserAuthenticationRequired(true)
            .setUserAuthenticationValidityDurationSeconds(
                   AUTH_VALID_DURATION_IN_SECOND)
            .build();
    try {
        keyGenerator.init(keySpec);
    } catch (InvalidAlgorithmParameterException e) {
        Log.e("EXAMPLE", "Failed to generate a secret key.");
        throw new RuntimeException(e);
    }
    keyGenerator.generateKey();

    // access the generated key in the android keystore, then
    // use the cipher to create an encrypted version of the key
    byte[] initializationVector;
    byte[] encryptedKeyForRealm;
    try {
        SecretKey secretKey =
                (SecretKey) keyStore.getKey("realm_key", null);
        cipher.init(Cipher.ENCRYPT_MODE, secretKey);
        encryptedKeyForRealm = cipher.doFinal(realmKey);
        initializationVector = cipher.getIV();
    } catch (InvalidKeyException | UnrecoverableKeyException
            | NoSuchAlgorithmException | KeyStoreException
            | BadPaddingException | IllegalBlockSizeException e) {
        Log.e("EXAMPLE", "Failed encrypting the key with the secret key.");
        throw new RuntimeException(e);
    }

    // keep the encrypted key in shared preferences
    // to persist it across application runs
    byte[] initializationVectorAndEncryptedKey =
            new byte[Integer.BYTES +
                    initializationVector.length +
                    encryptedKeyForRealm.length];
    ByteBuffer buffer = ByteBuffer.wrap(initializationVectorAndEncryptedKey);
    buffer.order(ByteOrder.BIG_ENDIAN);
    buffer.putInt(initializationVector.length);
    buffer.put(initializationVector);
    buffer.put(encryptedKeyForRealm);
    activity.getSharedPreferences("realm_key", Context.MODE_PRIVATE).edit()
            .putString("iv_and_encrypted_key",
                    Base64.encodeToString(initializationVectorAndEncryptedKey, Base64.NO_WRAP))
            .apply();

    return realmKey; // pass to a realm configuration via encryptionKey()
}
