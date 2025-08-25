/// The screen containing a list of items in an ItemGroup. Implements functionality for adding, rearranging,
/// and deleting items in the ItemGroup.
struct ItemsView: View {
    @ObservedRealmObject var itemGroup: ItemGroup

    /// The button to be displayed on the top left.
    var leadingBarButton: AnyView?

    var body: some View {
        NavigationView {
            VStack {
                // The list shows the items in the realm.
                List {
                    ForEach(itemGroup.items) { item in
                        ItemRow(item: item)
                    }.onDelete(perform: $itemGroup.items.remove)
                    .onMove(perform: $itemGroup.items.move)
                }
                .listStyle(GroupedListStyle())
                    .navigationBarTitle("Items", displayMode: .large)
                    .navigationBarBackButtonHidden(true)
                    .navigationBarItems(
                        leading: self.leadingBarButton,
                        // Edit button on the right to enable rearranging items
                        trailing: EditButton())
                // Action bar at bottom contains Add button.
                HStack {
                    Spacer()
                    Button(action: {
                        // The bound collection automatically
                        // handles write transactions, so we can
                        // append directly to it.
                        $itemGroup.items.append(Item())
                    }) { Image(systemName: "plus") }
                }.padding()
            }
        }
    }
}
