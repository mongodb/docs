package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.internal.platform.runBlocking
import io.realm.kotlin.mongodb.App
import io.realm.kotlin.mongodb.Credentials
import kotlin.test.Test
import kotlin.test.assertFails
import kotlin.test.assertNotNull

class ManageEmailPasswordUsers:  RealmTest() {
    @Test
    fun emailPasswordRegisterTest() {
        val email = getRandom()
        val password = getRandom()
        // :snippet-start: register-email-password-user
        val app: App = App.create(YOUR_APP_ID) // Replace this with your App ID
        runBlocking { // use runBlocking sparingly -- it can delay UI interactions
            app.emailPasswordAuth.registerUser(email, password)
            // :remove-start:
            val user = app.login(Credentials.emailPassword(email, password))
            assertNotNull(user.id)
            // :remove-end:
        }
        // :snippet-end:
    }

    @Test
    fun confirmEmailPasswordUserTest() {
        val token = getRandom()
        val tokenId = getRandom()
        // :snippet-start: confirm-email-password-user
        val app: App = App.create(YOUR_APP_ID) // Replace this with your App ID
        assertFails(message = "invalid token data.", block = { // :remove:
        runBlocking { // use runBlocking sparingly -- it can delay UI interactions
            app.emailPasswordAuth.confirmUser(token, tokenId)
        }
        // :snippet-end:
        } )
    }

    @Test
    fun resendConfirmationEmailTest() {
        val email = getRandom()
        val password = getRandom()
        // :snippet-start: resend-password-confirmation-email
        val app: App = App.create(YOUR_APP_ID) // Replace this with your App ID
        assertFails(message = "already confirmed", block = { // :remove:
        runBlocking { // use runBlocking sparingly -- it can delay UI interaction
            app.emailPasswordAuth.registerUser(email, password) // :remove:
            app.emailPasswordAuth.resendConfirmationEmail(email)
        }
        // :snippet-end:
        } )
    }

    @Test
    fun retryConfirmationFunctionTest() {
        val email = getRandom()
        val password = getRandom()
        // :snippet-start: retry-custom-confirmation
        val app: App = App.create(YOUR_APP_ID) // Replace this with your App ID
        assertFails(message = "already confirmed", block = { // :remove:
        runBlocking { // use runBlocking sparingly -- it can delay UI interaction
            app.emailPasswordAuth.registerUser(email, password) // :remove:
            app.emailPasswordAuth.retryCustomConfirmation(email)
        }
        // :snippet-end:
        } )
    }

    @Test
    fun sendPasswordResetEmailTest() {
        val email = getRandom()
        val password = getRandom()
        // :snippet-start: send-password-reset-email
        val app: App = App.create(YOUR_APP_ID) // Replace this with your App ID
        assertFails(message = "already confirmed", block = { // :remove:
        runBlocking { // use runBlocking sparingly -- it can delay UI interaction
            app.emailPasswordAuth.registerUser(email, password) // :remove:
            app.emailPasswordAuth.sendResetPasswordEmail(email)
        }
        // :snippet-end:
        } )
    }

    @Test
    fun resetPasswordTest() {
        val token = getRandom()
        val tokenId = getRandom()
        val newPassword = getRandom()
        // :snippet-start: reset-password
        val app: App = App.create(YOUR_APP_ID) // Replace this with your App ID
        assertFails(message = "invalid token data.", block = { // :remove:
        runBlocking { // use runBlocking sparingly -- it can delay UI interactions
            app.emailPasswordAuth.resetPassword(token, tokenId, newPassword)
        }
        // :snippet-end:
        } )
    }

    @Test
    fun callPasswordResetFunctionAssumeSuccessTest() {
        val email = getRandom()
        val password = getRandom()
        val newPassword = getRandom()
        val args = arrayOf("Security answer 1", "Security answer 2")
        // :snippet-start: call-password-reset-function
        val app: App = App.create(YOUR_APP_ID) // Replace this with your App ID
        assertFails(message = "already confirmed", block = { // :remove:
        runBlocking { // use runBlocking sparingly -- it can delay UI interaction
            app.emailPasswordAuth.registerUser(email, password) // :remove:
            app.emailPasswordAuth.callResetPasswordFunction(email, newPassword, args)
        }
        // :snippet-end:
        } )
    }

    @Test
    fun callPasswordResetFunctionAssumePendingTest() {
        val email = getRandom()
        val password = getRandom()
        val newPassword = getRandom()
        // :snippet-start: call-password-reset-function-assume-pending
        val app: App = App.create(YOUR_APP_ID) // Replace this with your App ID
        assertFails(message = "already confirmed", block = { // :remove:
        runBlocking { // use runBlocking sparingly -- it can delay UI interaction
            app.emailPasswordAuth.registerUser(email, password) // :remove:
            app.emailPasswordAuth.callResetPasswordFunction(email, newPassword)
        }
        // :snippet-end:
    } )
    }
}