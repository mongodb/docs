// Create custom arguments for your Atlas Function
val customCredentials = Credentials.customFunction(
    payload = mapOf("username" to "bob")
)
val user = app.login(customCredentials)
