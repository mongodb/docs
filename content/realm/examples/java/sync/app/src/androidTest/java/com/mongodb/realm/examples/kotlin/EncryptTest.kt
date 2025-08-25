package com.mongodb.realm.examples.kotlin

import android.content.Context
import android.security.keystore.KeyGenParameterSpec
import android.security.keystore.KeyProperties
import android.util.Base64
import android.util.Log
import com.mongodb.realm.examples.Expectation
import com.mongodb.realm.examples.RealmTest
import com.mongodb.realm.examples.YOUR_APP_ID
import com.mongodb.realm.examples.model.kotlin.Frog
import io.realm.Realm
import io.realm.mongodb.App
import io.realm.mongodb.AppConfiguration
import io.realm.mongodb.Credentials
import io.realm.mongodb.User
import io.realm.mongodb.sync.SyncConfiguration
import org.bson.types.ObjectId
import org.junit.Test
import java.io.IOException
import java.nio.ByteBuffer
import java.nio.ByteOrder
import java.security.*
import java.security.cert.CertificateException
import java.util.*
import javax.crypto.*
import javax.crypto.spec.IvParameterSpec


class EncryptTest : RealmTest() {
    @Test
    fun encryptBasic() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val random = Random()
            val PARTITION = "encrypted_" + random.nextInt(10000)
            val app = App(AppConfiguration.Builder(appID).build())
            val credentials = Credentials.anonymous()
            app.loginAsync(credentials) {
                if (it.isSuccess) {
                    val user = it.get()
                    // :snippet-start: encrypt-basic
                    // Generate a key
                    val key = ByteArray(64)
                    SecureRandom().nextBytes(key)
                    val config = SyncConfiguration.Builder(app.currentUser(), PARTITION)
                            .encryptionKey(key)
                            .build()
                    // Open the encrypted realm
                    val realm = Realm.getInstance(config)
                    // :remove-start:
                    expectation.fulfill()
                    // :remove-end:
                    // :snippet-end:
                } else {
                    Log.e("EXAMPLE", "Failed to log in: ${it.error}")
                }
            }
        }
        expectation.await()
    }

    @Test
    fun encryptFull() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID = YOUR_APP_ID // replace this with your App ID
            val random = Random()
            val PARTITION = "encrypted_" + random.nextInt(10000)
            val app = App(AppConfiguration.Builder(appID).build())
            val credentials = Credentials.anonymous()
            Log.v("EXAMPLE", "logging in")
            app.loginAsync(credentials) { it: App.Result<User?> ->
                if (it.isSuccess) {
                    val user = it.get()

                    // :snippet-start: read-and-write-encrypted-realm
                    // use a new encryption key to write and read from a realm
                    val realmKey = getNewKey()
                    // use the key to configure a realm
                    val realmConfig = SyncConfiguration.Builder(user, PARTITION)
                            .allowQueriesOnUiThread(true)
                            .allowWritesOnUiThread(true)
                            .encryptionKey(realmKey)
                            .build()
                    // once we've used the key to generate a config, erase it in memory manually
                    Arrays.fill(realmKey, 0.toByte())

                    // open and write and read from the realm
                    val encryptedRealm = Realm.getInstance(realmConfig)
                    val id = ObjectId()
                    encryptedRealm.executeTransaction {
                        eR: Realm -> eR.createObject(Frog::class.java, id)
                    }
                    val frog = encryptedRealm.where(Frog::class.java).findFirst()
                    val written_id = frog!!._id
                    Log.v("EXAMPLE", "generated id: " + id
                            + ", written frog id: " + written_id)
                    encryptedRealm.close()

                    // get the encryption key from the key store a second time
                    val decryptedKey = getExistingKey()

                    // configure a realm with the key
                    val realmConfigDecrypt = SyncConfiguration.Builder(user, PARTITION)
                            .allowQueriesOnUiThread(true)
                            .allowWritesOnUiThread(true)
                            .encryptionKey(decryptedKey)
                            .build()
                    // once we've used the key to generate a config, erase it in memory manually
                    Arrays.fill(decryptedKey, 0.toByte())

                    // note: realm is encrypted, this variable just demonstrates that we've
                    // decrypted the contents with the key in memory
                    val decryptedRealm = Realm.getInstance(realmConfigDecrypt)
                    val frogDecrypt = decryptedRealm.where(Frog::class.java).findFirst()
                    Log.v("EXAMPLE", "generated id: " + id
                            + ", decrypted written frog id: " + frogDecrypt!!._id)
                    decryptedRealm.close()
                    // :snippet-end:
                    expectation.fulfill()
                } else {
                    Log.e("EXAMPLE", "Failed to log in: " + it.error.errorMessage)
                }
            }
        }
        expectation.await()
    }


    // :snippet-start: encrypt-key
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
                // :remove-start:
                // TODO: (but not a todo) -- keys should require user auth, but we skip that in test
                // :remove-end:
                // :uncomment-start:
                //.setUserAuthenticationRequired(true)
                //.setUserAuthenticationValidityDurationSeconds(
                //        AUTH_VALID_DURATION_IN_SECOND)
                // :uncomment-end:
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
    // :snippet-end:

    // :snippet-start: decrypt-key
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
    // :snippet-end:
}
