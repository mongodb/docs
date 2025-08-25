import RealmSwift
import SwiftUI

// MARK: Models

/// Random adjectives for more interesting demo item names
let randomAdjectives = [
    "fluffy", "classy", "bumpy", "bizarre", "wiggly", "quick", "sudden",
    "acoustic", "smiling", "dispensable", "foreign", "shaky", "purple", "keen",
    "aberrant", "disastrous", "vague", "squealing", "ad hoc", "sweet"
]

/// Random noun for more interesting demo item names
let randomNouns = [
    "floor", "monitor", "hair tie", "puddle", "hair brush", "bread",
    "cinder block", "glass", "ring", "twister", "coasters", "fridge",
    "toe ring", "bracelet", "cabinet", "nail file", "plate", "lace",
    "cork", "mouse pad"
]

/// An individual item. Part of an `ItemGroup`.
final class Item: Object, ObjectKeyIdentifiable {
    /// The unique ID of the Item. `primaryKey: true` declares the
    /// _id member as the primary key to the realm.
    @Persisted(primaryKey: true) var _id: ObjectId

    /// The name of the Item, By default, a random name is generated.
    @Persisted var name = "\(randomAdjectives.randomElement()!) \(randomNouns.randomElement()!)"

    /// A flag indicating whether the user "favorited" the item.
    @Persisted var isFavorite = false

    /// Users can enter a description, which is an empty string by default
    @Persisted var itemDescription = ""
    
    /// The backlink to the `ItemGroup` this item is a part of.
    @Persisted(originProperty: "items") var group: LinkingObjects<ItemGroup>
    
}

/// Represents a collection of items.
final class ItemGroup: Object, ObjectKeyIdentifiable {
    /// The unique ID of the ItemGroup. `primaryKey: true` declares the
    /// _id member as the primary key to the realm.
    @Persisted(primaryKey: true) var _id: ObjectId

    /// The collection of Items in this group.
    @Persisted var items = RealmSwift.List<Item>()
    
}

extension Item {
    static let item1 = Item(value: ["name": "fluffy coasters", "isFavorite": false, "ownerId": "previewRealm"])
    static let item2 = Item(value: ["name": "sudden cinder block", "isFavorite": true, "ownerId": "previewRealm"])
    static let item3 = Item(value: ["name": "classy mouse pad", "isFavorite": false, "ownerId": "previewRealm"])
}

extension ItemGroup {
    static let itemGroup = ItemGroup(value: ["ownerId": "previewRealm"])
    
    static var previewRealm: Realm {
        var realm: Realm
        let identifier = "previewRealm"
        let config = Realm.Configuration(inMemoryIdentifier: identifier)
        do {
            realm = try Realm(configuration: config)
            // Check to see whether the in-memory realm already contains an ItemGroup.
            // If it does, we'll just return the existing realm.
            // If it doesn't, we'll add an ItemGroup and append the Items.
            let realmObjects = realm.objects(ItemGroup.self)
            if realmObjects.count == 1 {
                return realm
            } else {
                try realm.write {
                    realm.add(itemGroup)
                    itemGroup.items.append(objectsIn: [Item.item1, Item.item2, Item.item3])
                }
                return realm
            }
        } catch let error {
            fatalError("Can't bootstrap item data: \(error.localizedDescription)")
        }
    }
}

// MARK: Views

// MARK: Main Views
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

// MARK: Item Views
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

struct ItemsView_Previews: PreviewProvider {
    static var previews: some View {
        let realm = ItemGroup.previewRealm
        let itemGroup = realm.objects(ItemGroup.self)
        ItemsView(itemGroup: itemGroup.first!)
    }
}

/// Represents an Item in a list.
struct ItemRow: View {
    @ObservedRealmObject var item: Item

    var body: some View {
        // You can click an item in the list to navigate to an edit details screen.
        NavigationLink(destination: ItemDetailsView(item: item)) {
            Text(item.name)
            if item.isFavorite {
                // If the user "favorited" the item, display a heart icon
                Image(systemName: "heart.fill")
            }
        }
    }
}

/// Represents a screen where you can edit the item's name.
struct ItemDetailsView: View {
    @ObservedRealmObject var item: Item

    var body: some View {
        VStack(alignment: .leading) {
            Text("Enter a new name:")
            // Accept a new name
            TextField("New name", text: $item.name)
                .navigationBarTitle(item.name)
                .navigationBarItems(trailing: Toggle(isOn: $item.isFavorite) {
                    Image(systemName: item.isFavorite ? "heart.fill" : "heart")
                })
        }.padding()
    }
}

struct ItemDetailsView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationView {
            ItemDetailsView(item: Item.item2)
        }
    }
}
