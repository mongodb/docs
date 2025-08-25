/// The main screen that determines whether to present the SyncContentView or the LocalOnlyContentView.
@main
struct ContentView: SwiftUI.App {
    var body: some Scene {
        WindowGroup {
            // Using Sync?
            if let app = app {
                SyncContentView(app: app)
            } else {
                LocalOnlyContentView()
            }
        }
    }
}
