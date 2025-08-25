package com.mongodb.realm.examples.java;

import android.content.Context;
import android.security.keystore.KeyGenParameterSpec;
import android.security.keystore.KeyProperties;
import android.util.Base64;
import android.util.Log;

import com.mongodb.realm.examples.CustomApplicationKt;
import com.mongodb.realm.examples.Expectation;
import com.mongodb.realm.examples.RealmTest;
import com.mongodb.realm.examples.model.kotlin.Frog;

import org.bson.types.ObjectId;
import org.junit.Test;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.security.SecureRandom;
import java.security.UnrecoverableKeyException;
import java.security.cert.CertificateException;
import java.util.Arrays;
import java.util.Random;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.KeyGenerator;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;

import io.realm.Realm;
import io.realm.mongodb.App;
import io.realm.mongodb.AppConfiguration;
import io.realm.mongodb.Credentials;
import io.realm.mongodb.User;
import io.realm.mongodb.sync.SyncConfiguration;

import static com.mongodb.realm.examples.RealmTestKt.YOUR_APP_ID;

public class EncryptTest extends RealmTest {

    @Test
    public void encryptBasic() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            Random random = new Random();
            String PARTITION = "encrypted_" + random.nextInt(10000);
            App app = new App(new AppConfiguration.Builder(appID).build());
            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    User user = it.get();
                    // :snippet-start: encrypt-basic
                    // Generate a key
                    byte[] key = new byte[64];
                    new SecureRandom().nextBytes(key);
                    SyncConfiguration config =
                            new SyncConfiguration.Builder(app.currentUser(), PARTITION)
                            .encryptionKey(key)
                            .build();
                    // Open the encrypted realm
                    Realm realm = Realm.getInstance(config);
                    // :remove-start:
                    expectation.fulfill();
                    // :remove-end:
                    // :snippet-end:
                } else {
                    Log.e("EXAMPLE", "Failed to log in: "
                            + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }

    @Test
    public void encryptFull() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = CustomApplicationKt.YOUR_APP_ID; // replace this with your App ID
            Random random = new Random();
            String PARTITION = "encrypted_" + random.nextInt(10000);
            App app = new App(new AppConfiguration.Builder(appID).build());
            Credentials credentials = Credentials.anonymous();
            Log.v("EXAMPLE", "logging in");
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    User user = it.get();

                    // :snippet-start: read-and-write-encrypted-realm
                    // use a new encryption key to write and read from a realm
                    byte[] realmKey = getNewKey();
                    // use the key to configure a realm
                    final SyncConfiguration realmConfig =
                            new SyncConfiguration.Builder(user, PARTITION)
                            .allowQueriesOnUiThread(true)
                            .allowWritesOnUiThread(true)
                            .encryptionKey(realmKey)
                            .build();
                    // once we've used the key to generate a config, erase it in memory manually
                    Arrays.fill(realmKey, (byte) 0);

                    // open and write and read from the realm
                    Realm encryptedRealm = Realm.getInstance(realmConfig);
                    ObjectId id = new ObjectId();
                    encryptedRealm.executeTransaction(eR -> {
                        eR.createObject(Frog.class, id);
                    });
                    Frog frog = encryptedRealm.where(Frog.class).findFirst();
                    ObjectId written_id = frog.get_id();
                    Log.v("EXAMPLE", "generated id: " + id
                            + ", written frog id: " + written_id);
                    encryptedRealm.close();

                    // get the encryption key from the key store a second time
                    byte[] decryptedKey = getExistingKey();

                    // configure a realm with the key
                    final SyncConfiguration realmConfigDecrypt =
                            new SyncConfiguration.Builder(user, PARTITION)
                            .allowQueriesOnUiThread(true)
                            .allowWritesOnUiThread(true)
                            .encryptionKey(decryptedKey)
                            .build();
                    // once we've used the key to generate a config, erase it in memory manually
                    Arrays.fill(decryptedKey, (byte) 0);

                    // note: realm is encrypted, this variable just demonstrates that we've
                    // decrypted the contents with the key in memory
                    Realm decryptedRealm = Realm.getInstance(realmConfigDecrypt);

                    Frog frogDecrypt = decryptedRealm.where(Frog.class).findFirst();
                    Log.v("EXAMPLE", "generated id: " + id
                            + ", decrypted written frog id: " + frogDecrypt.get_id());
                    decryptedRealm.close();
                    // :snippet-end:
                    expectation.fulfill();
                } else {
                    Log.e("EXAMPLE", "Failed to log in: "
                            + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }


    // :snippet-start: encrypt-key
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
                // :remove-start:
                // TODO: (but not a todo) -- keys should require user auth, but we skip that in test
                // :remove-end:
                // :uncomment-start:
                //.setUserAuthenticationRequired(true)
                //.setUserAuthenticationValidityDurationSeconds(
                //        AUTH_VALID_DURATION_IN_SECOND)
                // :uncomment-end:
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
    // :snippet-end:

    // :snippet-start: decrypt-key
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
    // :snippet-end:
}
