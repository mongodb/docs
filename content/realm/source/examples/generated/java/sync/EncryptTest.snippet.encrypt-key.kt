// Create a key to encrypt a realm and save it securely in the keystore
fun getNewKey(): ByteArray {
    // open a connection to the android keystore
    val keyStore: KeyStore
    try {
        keyStore = KeyStore.getInstance("AndroidKeyStore")
        keyStore.load(null)
    } catch (e: Exception) {
        Log.v("EXAMPLE", "Failed to open the keystore.")
        throw RuntimeException(e)
    }

    // create a securely generated random asymmetric RSA key
    val realmKey = ByteArray(Realm.ENCRYPTION_KEY_LENGTH)
    SecureRandom().nextBytes(realmKey)

    // create a cipher that uses AES encryption -- we'll use this to encrypt our key
    val cipher: Cipher
    cipher = try {
        Cipher.getInstance(KeyProperties.KEY_ALGORITHM_AES
                + "/" + KeyProperties.BLOCK_MODE_CBC
                + "/" + KeyProperties.ENCRYPTION_PADDING_PKCS7)
    } catch (e: Exception) {
        Log.e("EXAMPLE", "Failed to create a cipher.")
        throw RuntimeException(e)
    }

    // generate secret key
    val keyGenerator: KeyGenerator
    keyGenerator = try {
        KeyGenerator.getInstance(
                KeyProperties.KEY_ALGORITHM_AES,
                "AndroidKeyStore")
    } catch (e: NoSuchAlgorithmException) {
        Log.e("EXAMPLE", "Failed to access the key generator.")
        throw RuntimeException(e)
    }
    val keySpec = KeyGenParameterSpec.Builder(
            "realm_key",
            KeyProperties.PURPOSE_ENCRYPT or KeyProperties.PURPOSE_DECRYPT)
            .setBlockModes(KeyProperties.BLOCK_MODE_CBC)
            .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_PKCS7)
            .setUserAuthenticationRequired(true)
            .setUserAuthenticationValidityDurationSeconds(
                   AUTH_VALID_DURATION_IN_SECOND)
            .build()
    try {
        keyGenerator.init(keySpec)
    } catch (e: InvalidAlgorithmParameterException) {
        Log.e("EXAMPLE", "Failed to generate a secret key.")
        throw RuntimeException(e)
    }
    keyGenerator.generateKey()

    // access the generated key in the android keystore, then
    // use the cipher to create an encrypted version of the key
    val initializationVector: ByteArray
    val encryptedKeyForRealm: ByteArray
    try {
        val secretKey = keyStore.getKey("realm_key", null) as SecretKey
        cipher.init(Cipher.ENCRYPT_MODE, secretKey)
        encryptedKeyForRealm = cipher.doFinal(realmKey)
        initializationVector = cipher.iv
    } catch (e: Exception) {
        Log.e("EXAMPLE", "Failed encrypting the key with the secret key.")
        throw RuntimeException(e)
    }

    // keep the encrypted key in shared preferences
    // to persist it across application runs
    val initializationVectorAndEncryptedKey = ByteArray(Integer.BYTES +
            initializationVector.size +
            encryptedKeyForRealm.size)
    val buffer = ByteBuffer.wrap(initializationVectorAndEncryptedKey)
    buffer.order(ByteOrder.BIG_ENDIAN)
    buffer.putInt(initializationVector.size)
    buffer.put(initializationVector)
    buffer.put(encryptedKeyForRealm)
    activity!!.getSharedPreferences("realm_key", Context.MODE_PRIVATE).edit()
            .putString("iv_and_encrypted_key",
                    Base64.encodeToString(initializationVectorAndEncryptedKey, Base64.NO_WRAP))
            .apply()
    return realmKey // pass to a realm configuration via encryptionKey()
}
