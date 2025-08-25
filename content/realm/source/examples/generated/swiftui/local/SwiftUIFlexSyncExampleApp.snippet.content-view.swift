/// The main screen that determines whether to present the SyncContentView or the LocalOnlyContentView.
/// For now, it always displays the LocalOnlyContentView.
@main
struct ContentView: SwiftUI.App {
    var body: some Scene {
        WindowGroup {
            LocalOnlyContentView()
        }
    }
}
