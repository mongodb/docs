let app = App(id: YOUR_APP_SERVICES_APP_ID)
let users = app.allUsers
users.forEach({ (key, user) in
    print("User: \(key) \(user)")
})
