val credentials = Credentials.customFunction(
    CustomUserCredential(
        userId = 500,
        password = "securePassword"
    )
)
app.login(credentials)
