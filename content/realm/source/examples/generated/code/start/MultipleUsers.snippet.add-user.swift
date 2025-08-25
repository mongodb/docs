let app = App(id: YOUR_APP_SERVICES_APP_ID)

let joeCredentials = Credentials.emailPassword(email: "joe@example.com", password: "passw0rd")
app.login(credentials: joeCredentials) { (result) in
    switch result {
    case .failure(let error):
        print("Login failed: \(error.localizedDescription)")
    case .success(let joe):
        // The active user is now Joe
        assert(joe == app.currentUser)
    }
}

let emmaCredentials = Credentials.emailPassword(email: "emma@example.com", password: "pa55word")
app.login(credentials: emmaCredentials) { (result) in
    switch result {
    case .failure(let error):
        print("Login failed: \(error.localizedDescription)")
    case .success(let emma):
        // The active user is now Joe
        assert(emma == app.currentUser)
    }
}
