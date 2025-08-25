func testAsyncCallFunction() async {
    let app = App(id: YOUR_APP_SERVICES_APP_ID)

    // ... log in ...

    let user = app.currentUser!

    do {
        // The dynamic member name `concatenate` is directly associated with the
        // function name. The first argument is the `BSONArray` of arguments to be
        // provided to the function - in this case, a string that represents a
        // username and a string that represents an email domain.
        let concatenatedString = try await user.functions.concatenate([AnyBSON("john.smith"), AnyBSON("@companyemail.com")])
        print("Called function 'concatenate' and got result: \(concatenatedString)")
        assert(concatenatedString == "john.smith@companyemail.com")
    } catch {
        print("Function call failed: \(error.localizedDescription)")
    }
}
