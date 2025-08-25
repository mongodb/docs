val newPassword = "newFakePassword"
val args = arrayOf("security answer 1", "security answer 2")

app.emailPassword.callResetPasswordFunctionAsync(email, newPassword, args) {
    if (it.isSuccess) {
        Log.i("EXAMPLE", "Successfully reset the password for $email")
    } else {
        Log.e("EXAMPLE", "Failed to reset the password for $email: $it.error")
    }
}
