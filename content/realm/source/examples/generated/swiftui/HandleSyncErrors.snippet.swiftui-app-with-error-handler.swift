let app = App(id: flexibleSyncAppId)

@main
struct realmSwiftUIApp: SwiftUI.App {
    // Initialize the error handler
    @StateObject var errorHandler = ErrorHandler(app: app)

    var body: some Scene {
        WindowGroup {
            NextView(app: app)
                // Inject the error handler as an environment object
                .environmentObject(errorHandler)
                // Display an alert to the user containing the error when a Sync error occurs
                .alert(Text("Error"), isPresented: .constant(errorHandler.error != nil)) {
                    Button("OK", role: .cancel) { errorHandler.error = nil }
                } message: {
                    Text(errorHandler.error?.localizedDescription ?? "")
                }
        }
    }
}
