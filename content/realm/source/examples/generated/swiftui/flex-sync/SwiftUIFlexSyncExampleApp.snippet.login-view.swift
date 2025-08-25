/// Represents the login screen. We will have a button to log in anonymously.
struct LoginView: View {
    // Hold an error if one occurs so we can display it.
    @State var error: Error?
    
    // Keep track of whether login is in progress.
    @State var isLoggingIn = false

    var body: some View {
        VStack {
            if isLoggingIn {
                ProgressView()
            }
            if let error = error {
                Text("Error: \(error.localizedDescription)")
            }
            Button("Log in anonymously") {
                // Button pressed, so log in
                isLoggingIn = true
                Task {
                    do {
                        let user = try await app!.login(credentials: .anonymous)
                        // Other views are observing the app and will detect
                        // that the currentUser has changed. Nothing more to do here.
                        print("Logged in as user with id: \(user.id)")
                    } catch {
                        print("Failed to log in: \(error.localizedDescription)")
                        // Set error to observed property so it can be displayed
                        self.error = error
                        return
                    }
                }
            }.disabled(isLoggingIn)
        }
    }
}
