// The user has previously created an email/password account
user.linkCredentialsAsync(
    Credentials.emailPassword(
        email,
        password
    )
) { result ->
    if (result.isSuccess) {
        Log.v(
            "EXAMPLE",
            "Successfully linked existing user identity " +
            "with email/password user: ${result.get()}"
        )
    } else {
        Log.e(
            "EXAMPLE",
            "Failed to link user identities with: ${result.error}"
        )
    }
}
