/// A button that handles logout requests.
struct LogoutButton: View {
    @State var isLoggingOut = false

    var body: some View {
        Button("Log Out") {
            guard let user = app!.currentUser else {
                return
            }
            isLoggingOut = true
            Task {
                do {
                    try await app!.currentUser!.logOut()
                    // Other views are observing the app and will detect
                    // that the currentUser has changed. Nothing more to do here.
                } catch {
                    print("Error logging out: \(error.localizedDescription)")
                }
            }
        }.disabled(app!.currentUser == nil || isLoggingOut)
    }
}

