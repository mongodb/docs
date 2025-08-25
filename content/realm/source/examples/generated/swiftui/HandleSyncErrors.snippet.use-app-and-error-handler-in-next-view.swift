struct NextView: View {
    @ObservedObject var app: RealmSwift.App
    // Use the error handler that you injected into the environment
    @EnvironmentObject var errorHandler: ErrorHandler
    
    var body: some View {
        Text("You might log users in or handle errors in this view")
    }
}
