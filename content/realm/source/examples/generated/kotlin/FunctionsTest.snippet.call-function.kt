runBlocking {
    val app: App = App.create(appID)
    val user = app.login(credentials)

    // Access the Atlas Function through the authenticated user
    // Pass the Function name and all arguments
    val response = user.functions.call<Int>("sum", 1, 2)

    print(response) // prints: 3
}
