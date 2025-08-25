package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.internal.platform.runBlocking
import io.realm.kotlin.log.LogLevel
import io.realm.kotlin.log.RealmLog
import io.realm.kotlin.log.RealmLogger
import io.realm.kotlin.mongodb.App
import io.realm.kotlin.mongodb.AppConfiguration
import io.realm.kotlin.mongodb.Credentials
import io.realm.kotlin.mongodb.annotations.ExperimentalEdgeServerApi
import io.realm.kotlin.mongodb.exceptions.ConnectionException
import io.realm.kotlin.mongodb.exceptions.InvalidCredentialsException
import io.realm.kotlin.mongodb.exceptions.ServiceException
import kotlinx.coroutines.channels.Channel
import kotlin.test.Ignore
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith
import kotlin.test.assertNotNull
import kotlin.test.assertTrue
import kotlin.time.Duration.Companion.minutes
import kotlin.time.Duration.Companion.seconds

class AppClientTest : RealmTest() {
    @Test
    fun initializeAndCloseAppClientTest() {
        // :snippet-start: initialize-app-client
        // Creates an App with default configuration values
        val app = App.create(YOUR_APP_ID) // Replace with your App ID
        // :snippet-end:
        assertEquals(app.configuration.appId, YOUR_APP_ID) // :remove:
        // :snippet-start: close-app-client
        app.close()
        // :snippet-end:
    }

    @Test
    fun configureAppClient() {
        val config =
        // :snippet-start: configure-app-client
            // Creates an App with custom configuration values
            AppConfiguration.Builder(YOUR_APP_ID)
                // Specify your custom configuration values
                .appName("my-app-name")
                .appVersion("1.0.0")
                .baseUrl("http://localhost:9090")
                .build()
        // :snippet-end:
        assertEquals(config.appName, "my-app-name")
        assertEquals(config.baseUrl, "http://localhost:9090")
        assertEquals(config.appVersion, "1.0.0")
    }

    @Test
    fun customBaseUrl() {
        val defaultBaseUrl = "https://services.cloud.mongodb.com"
        val newBaseUrl = "https://example.com"
        val defaultConfig = AppConfiguration.create(YOUR_APP_ID)
        assertEquals(defaultConfig.baseUrl, defaultBaseUrl)
        // :snippet-start: custom-base-url
        // Specify a baseUrl to connect to instead of the default
        val config = AppConfiguration.Builder(YOUR_APP_ID)
            .baseUrl("https://example.com")
            .build()
        // :snippet-end:
        assertEquals(config.baseUrl, newBaseUrl)
    }

    // :snippet-start: experimental-opt-in
    // Opt in to the experimental Edge Server API
    @OptIn(ExperimentalEdgeServerApi::class)
    // :snippet-end:
    @Ignore
    // TODO: Update when we get Edge Server running in a CI and can write automated tests for full flow
    // Ignored until we can test in CI (was tested locally and succeeded)
    fun changeBaseUrl() {
        runBlocking {
            val defaultBaseUrl = "https://services.cloud.mongodb.com"
            val customBaseUrl = "http://localhost:80"
            // :snippet-start: change-base-url
            // Specify a custom baseUrl to connect to.
            // In this case, an Edge Server instance running on the device:
            val config = AppConfiguration.Builder(EDGE_SERVER_APP_ID)
                .baseUrl("http://localhost:80")
                .build()
            val app = App.create(config)

            // ... log in a user and use the app ...
            // :remove-start:
            assertEquals(app.baseUrl, customBaseUrl)
            app.login(Credentials.anonymous())
            assertNotNull(app.currentUser)
            // :remove-end:

            // Later, change the baseUrl.
            // In this case, pass `null` to reset to default:
            // https://services.cloud.mongodb.com
            app.updateBaseUrl(null)
            // :snippet-end:
            assertEquals(app.baseUrl, defaultBaseUrl)
        }
    }

    @Test
    fun multiplexingTest() {
        // :snippet-start: enable-multiplexing
        val config = AppConfiguration.Builder(YOUR_APP_ID)
            .enableSessionMultiplexing(true)
            .build()
        // :snippet-end:
        assertTrue(config.enableSessionMultiplexing)
        // :snippet-start: enable-multiplexing-with-timeout
        val configCustomLingerTime = AppConfiguration.Builder(YOUR_APP_ID)
            .enableSessionMultiplexing(true)
            .syncTimeouts {
                connectionLingerTime = 10.seconds // Overrides default 30 secs
            }
            .build()
        // :snippet-end:
        assertTrue(configCustomLingerTime.enableSessionMultiplexing)
        assertEquals(configCustomLingerTime.syncTimeoutOptions.connectionLingerTime.inWholeSeconds, 10)
    }

    @Test
    fun syncTimeoutTest() {
        // :snippet-start: sync-timeout-configuration
        val config = AppConfiguration.Builder(YOUR_APP_ID)
            .syncTimeouts {
                connectTimeout = 1.minutes
                connectionLingerTime = 15.seconds
                pingKeepalivePeriod = 30.seconds
                pongKeepalivePeriod = 1.minutes
                fastReconnectLimit = 30.seconds
            }
            .build()
        // :snippet-end:
        with(config.syncTimeoutOptions) {
            assertEquals(1.minutes, connectTimeout)
            assertEquals(15.seconds, connectionLingerTime)
            assertEquals(30.seconds, pingKeepalivePeriod)
            assertEquals(1.minutes, pongKeepalivePeriod)
            assertEquals(30.seconds, fastReconnectLimit)
        }
    }

    @Test
    fun encryptAppMetadata() {
        val myEncryptionKey = getEncryptionKey()
        // :snippet-start: encrypted-app-client
        val config =
            AppConfiguration.Builder(YOUR_APP_ID)
                // Specify the encryption key
                .encryptionKey(myEncryptionKey)
                .build()
        // :snippet-end:
        assertTrue(config.encryptionKey.contentEquals(myEncryptionKey))
    }

    @Ignore
    // Ignored unless there's a way to test this easily...
    fun enablePlatformNetworking() {
        // :snippet-start: enable-platform-networking
        val config =
            AppConfiguration.Builder(YOUR_APP_ID)
                .usePlatformNetworking(true)
                .build()
        // :snippet-end:
    }

    @Test
    fun setCustomHttpHeadersTest() {
        val config1 = AppConfiguration.Builder(YOUR_APP_ID)
            .appName("my-app-name")
            .build()
        val config2 =
            // :snippet-start: set-custom-http-headers
            AppConfiguration.Builder(YOUR_APP_ID)
                .authorizationHeaderName("MyApp-Authorization")
                .customRequestHeaders { put("X-MyApp-Version", "1.0.0") }
                .build()
        // :snippet-end:
        assertEquals(config1.authorizationHeaderName, "Authorization")
        assertEquals(config2.authorizationHeaderName, "MyApp-Authorization")
        assertEquals(config2.customRequestHeaders["X-MyApp-Version"], "1.0.0")

        runBlocking {
            val app = App.create(config2)
            val originalLevel = RealmLog.level
            RealmLog.level = LogLevel.ALL
            val channel = Channel<Boolean>(1)

            val logger = object : RealmLogger {
                override val level: LogLevel = LogLevel.DEBUG
                override val tag: String = "LOGGER"

                override fun log(
                    level: LogLevel,
                    throwable: Throwable?,
                    message: String?,
                    vararg args: Any?,
                ) {
                    if (level == LogLevel.DEBUG && message!!.contains("-> X-MyApp-Version: 1.0.0") && message.contains("MyApp-Authorization")) {
                        channel.trySend(true)
                    }
                }
            }

            try {
                RealmLog.add(logger)
                // Perform a network-related op that will fail because the server does not expect the custom header
                assertFailsWith<ServiceException> {
                    app.login(Credentials.anonymous(reuseExisting = false))
                }
                assertTrue(channel.receiveOrFail())
            } finally {
                // Restore log status
                RealmLog.remove(logger)
                RealmLog.level = originalLevel
            }
            app.close()
        }
    }

    @Test
    fun testErrorHandlingTest() {
        val email = getRandom()
        val password = getRandom()
        runBlocking {
            // :snippet-start: handle-errors
            val app = App.create(YOUR_APP_ID)
            runCatching {
                app.login(Credentials.emailPassword(email, password))
            }.onSuccess {
                Log.v("Successfully logged in")
                // transition to another activity, load a fragment, to display logged-in user information here
            }.onFailure { ex: Throwable ->
                when (ex) {
                    is InvalidCredentialsException -> {
                        Log.v("Failed to login due to invalid credentials: ${ex.message}")
                        // :uncomment-start:
                        // Toast.makeText(baseContext,
                        //     "Invalid username or password. Please try again.", Toast.LENGTH_LONG).show()
                        // :uncomment-end:
                    }

                    is ConnectionException -> {
                        Log.e("Failed to login due to a connection error: ${ex.message}")
                        // :uncomment-start:
                        // Toast.makeText(baseContext,
                        //     "Login failed due to a connection error. Check your network connection and try again.", Toast.LENGTH_LONG).show()
                        // :uncomment-end:
                    }

                    else -> {
                        Log.e("Failed to login: ${ex.message}")
                        // generic error message for niche and unknown fail cases
                        // :uncomment-start:
                        // Toast.makeText(baseContext,
                        //     "Login failed. Please try again.", Toast.LENGTH_LONG).show()
                        // :uncomment-end:
                    }
                }
            }
            // :snippet-end:
            app.close()
        }
    }
}
