let app = App(id: YOUR_APP_SERVICES_APP_ID)

// ... log in ...
// Get another user on the device, for example with `app.allUsers`
let secondUser: User = getSomeOtherUser()

XCTAssertNotEqual(app.currentUser, secondUser)
// assert(app.currentUser != secondUser)

// Switch to another user
// app.switch(to: secondUser)

// The switch-to user becomes the app.currentUser
// XCTAssertEqual(app.currentUser, secondUser)
// assert(app.currentUser == secondUser)
