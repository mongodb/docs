let app = App(id: YOUR_APP_SERVICES_APP_ID)

// ... log in ...

let user = app.currentUser!

// The dynamic member name `concatenate` is directly associated with the
// function name. The first argument is the `BSONArray` of arguments to be
// provided to the function - in this case, a string that represents a
// username and a string that represents an email domain.
// The trailing closure is the completion handler to call when the function
// call is complete. This handler is executed on a non-main global
// `DispatchQueue`.
user.functions.concatenate([AnyBSON("john.smith"), AnyBSON("@companyemail.com")]) { concatenate, error in
    guard error == nil else {
        print("Function call failed: \(error!.localizedDescription)")
        return
    }
    guard case let .string(value) = concatenate else {
        print("Unexpected non-string result: \(concatenate ?? "nil")")
        return
    }
    print("Called function 'concatenate' and got result: \(value)")
    assert(value == "john.smith@companyemail.com")
}
