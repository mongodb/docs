let params: Document = ["username": "bob"]

app.login(credentials: Credentials.function(payload: params)) { (result) in
    switch result {
    case .failure(let error):
        print("Login failed: \(error.localizedDescription)")
    case .success(let user):
        print("Successfully logged in as user \(user)")
        // Now logged in, do something with user
        // Remember to dispatch to main if you are doing anything on the UI thread
    }
}
