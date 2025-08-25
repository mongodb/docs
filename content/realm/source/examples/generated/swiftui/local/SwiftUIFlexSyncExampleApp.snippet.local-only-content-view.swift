/// The main content view if not using Sync.
struct LocalOnlyContentView: View {
    @State var searchFilter: String = ""
    // Implicitly use the default realm's objects(ItemGroup.self)
    @ObservedResults(ItemGroup.self) var itemGroups
    
    var body: some View {
        if let itemGroup = itemGroups.first {
            // Pass the ItemGroup objects to a view further
            // down the hierarchy
            ItemsView(itemGroup: itemGroup)
        } else {
            // For this small app, we only want one itemGroup in the realm.
            // You can expand this app to support multiple itemGroups.
            // For now, if there is no itemGroup, add one here.
            ProgressView().onAppear {
                $itemGroups.append(ItemGroup())
            }
        }
    }
}
