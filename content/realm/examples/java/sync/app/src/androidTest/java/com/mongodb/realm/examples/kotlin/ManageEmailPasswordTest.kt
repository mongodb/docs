package com.mongodb.realm.examples.kotlin

import android.util.Log
import com.mongodb.realm.examples.Expectation
import com.mongodb.realm.examples.RealmTest
import com.mongodb.realm.examples.YOUR_APP_ID
import com.mongodb.realm.examples.getRandomPartition

import io.realm.mongodb.App
import io.realm.mongodb.AppConfiguration
import org.junit.Test
import java.util.*

class ManageEmailPasswordTest : RealmTest() {
    @Test
    fun testRegisterANewUserAccount() {
        val random = Random()
        val email = "test" + random.nextInt(100000)
        val password = "testtest"
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())

            // :snippet-start: register-a-new-user-account
            app.emailPassword.registerUserAsync(email, password) {
                if (it.isSuccess) {
                    Log.i("EXAMPLE","Successfully registered user.")
                    // :remove-start:
                    expectation.fulfill()
                    // :remove-end:
                } else {
                    Log.e("EXAMPLE","Failed to register user: ${it.error}")
                }
            }
            // :snippet-end:
        }
        // expectation.await() // TODO: Find out why this doesn't always work!
    }

    @Test
    fun confirmANewUsersEmailAddress() {
        val random = Random()
        val email = "test" + random.nextInt(100000)
        val password = "testtest"
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            val token = "token-fake"
            val tokenId = "token-id-fake"

            // :snippet-start: confirm-a-new-users-email-address
            // token and tokenId are query parameters in the confirmation
            // link sent in the confirmation email.
            app.emailPassword.confirmUserAsync(token, tokenId) {
                if (it.isSuccess) {
                    Log.i("EXAMPLE", "Successfully confirmed new user.")
                } else {
                    Log.e("EXAMPLE", "Failed to register user: ${it.error}")
                    // :remove-start:
                    expectation.fulfill()
                    // :remove-end:
                }
            }
            // :snippet-end:
        }
        expectation.await()
    }

    @Test
    fun resetAUsersPassword() {
        val random = Random()
        val email = "test" + random.nextInt(100000)
        val password = "testtest"
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            val token = "token-fake"
            val tokenId = "token-id-fake"
            val newPassword = "newFakePassword"

            // :snippet-start: send-reset-password-email
            app.emailPassword.sendResetPasswordEmailAsync(email) {
                if (it.isSuccess) {
                    Log.i("EXAMPLE", "Successfully sent the user a reset password link to $email")
                } else {
                    Log.e("EXAMPLE", "Failed to send the user a reset password link to $email: $it.error")
                }
            }
            // :snippet-end:

            // :snippet-start: reset-password
            // token and tokenId are query parameters in the confirmation
            // link sent in the password reset email.
            app.emailPassword.resetPasswordAsync(token, tokenId, newPassword) {
                if (it.isSuccess) {
                    Log.i("EXAMPLE", "Successfully updated password for user.")
                } else {
                    Log.e("EXAMPLE", "Failed to reset user's password: $it.error")
                    // :remove-start:
                    expectation.fulfill()
                    // :remove-end:
                }
            }
            // :snippet-end:
        }
        expectation.await()
    }

    @Test
    fun runAPasswordResetFunc() {
        val email = getRandomPartition()
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())

            // :snippet-start: run-password-reset-func
            val newPassword = "newFakePassword"
            val args = arrayOf("security answer 1", "security answer 2")

            app.emailPassword.callResetPasswordFunctionAsync(email, newPassword, args) {
                if (it.isSuccess) {
                    Log.i("EXAMPLE", "Successfully reset the password for $email")
                } else {
                    Log.e("EXAMPLE", "Failed to reset the password for $email: $it.error")
                    // :remove-start:
                    expectation.fulfill()
                    // :remove-end:
                }
            }
            // :snippet-end:
        }
        expectation.await()
    }
}