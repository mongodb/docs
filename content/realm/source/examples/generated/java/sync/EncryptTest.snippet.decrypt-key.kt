// Access the encrypted key in the keystore, decrypt it with the secret,
// and use it to open and read from the realm again
fun getExistingKey(): ByteArray {
    // open a connection to the android keystore
    val keyStore: KeyStore
    try {
        keyStore = KeyStore.getInstance("AndroidKeyStore")
        keyStore.load(null)
    } catch (e: Exception) {
        Log.e("EXAMPLE", "Failed to open the keystore.")
        throw RuntimeException(e)
    }

    // access the encrypted key that's stored in shared preferences
    val initializationVectorAndEncryptedKey = Base64.decode(activity
            ?.getSharedPreferences("realm_key", Context.MODE_PRIVATE)
            ?.getString("iv_and_encrypted_key", null), Base64.DEFAULT)
    val buffer = ByteBuffer.wrap(initializationVectorAndEncryptedKey)
    buffer.order(ByteOrder.BIG_ENDIAN)

    // extract the length of the initialization vector from the buffer
    val initializationVectorLength = buffer.int
    // extract the initialization vector based on that length
    val initializationVector = ByteArray(initializationVectorLength)
    buffer[initializationVector]
    // extract the encrypted key
    val encryptedKey = ByteArray(initializationVectorAndEncryptedKey.size
            - Integer.BYTES
            - initializationVectorLength)
    buffer[encryptedKey]

    // create a cipher that uses AES encryption to decrypt our key
    val cipher: Cipher
    cipher = try {
        Cipher.getInstance(KeyProperties.KEY_ALGORITHM_AES
                + "/" + KeyProperties.BLOCK_MODE_CBC
                + "/" + KeyProperties.ENCRYPTION_PADDING_PKCS7)
    } catch (e: Exception) {
        Log.e("EXAMPLE", "Failed to create cipher.")
        throw RuntimeException(e)
    }

    // decrypt the encrypted key with the secret key stored in the keystore
    val decryptedKey: ByteArray
    decryptedKey = try {
        val secretKey = keyStore.getKey("realm_key", null) as SecretKey
        val initializationVectorSpec = IvParameterSpec(initializationVector)
        cipher.init(Cipher.DECRYPT_MODE, secretKey, initializationVectorSpec)
        cipher.doFinal(encryptedKey)
    } catch (e: InvalidKeyException) {
        Log.e("EXAMPLE", "Failed to decrypt. Invalid key.")
        throw RuntimeException(e)
    } catch (e: Exception ) {
                Log.e("EXAMPLE",
                        "Failed to decrypt the encrypted realm key with the secret key.")
                throw RuntimeException(e)
    }
    return decryptedKey // pass to a realm configuration via encryptionKey()
}
