func testAsyncDeleteUser() async throws {
    // Logging in using anonymous authentication creates a user object
    let syncUser = try await app.login(credentials: Credentials.anonymous)
    // Now we have a user, and the total users in the app = 1
    XCTAssertNotNil(syncUser)
    XCTAssertEqual(app.allUsers.count, 1)
    // Call the `delete` method to delete the user
    try await syncUser.delete()
    // When you delete the user, the SyncSession is destroyed and
    // there is no current user.
    XCTAssertNil(app.currentUser)
    // Now that we've deleted the user, the app has no users.
    XCTAssertEqual(app.allUsers.count, 0)
}
