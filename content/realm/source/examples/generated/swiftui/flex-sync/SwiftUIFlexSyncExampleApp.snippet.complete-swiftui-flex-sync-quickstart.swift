import RealmSwift
import SwiftUI

// MARK: Atlas App Services (Optional)
// The App Services App. Change YOUR_APP_SERVICES_APP_ID_HERE to your App Services App ID.
// If you don't have a App Services App and don't wish to use Sync for now,
// you can change this to:
//   let app: RealmSwift.App? = nil
let app: RealmSwift.App? = RealmSwift.App(id: YOUR_APP_SERVICES_APP_ID_HERE)

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
    
    /// Store the user.id as the ownerId so you can query for the user's objects with Flexible Sync
    /// Add this to both the `ItemGroup` and the `Item` objects so you can read and write the linked objects.
    @Persisted var ownerId = ""
}

/// Represents a collection of items.
final class ItemGroup: Object, ObjectKeyIdentifiable {
    /// The unique ID of the ItemGroup. `primaryKey: true` declares the
    /// _id member as the primary key to the realm.
    @Persisted(primaryKey: true) var _id: ObjectId

    /// The collection of Items in this group.
    @Persisted var items = RealmSwift.List<Item>()
    
    /// Store the user.id as the ownerId so you can query for the user's objects with Flexible Sync
    /// Add this to both the `ItemGroup` and the `Item` objects so you can read and write the linked objects.
    @Persisted var ownerId = ""
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

/// This view observes the Realm app object.
/// Either direct the user to login, or open a realm
/// with a logged-in user.
struct SyncContentView: View {
    // Observe the Realm app object in order to react to login state changes.
    @ObservedObject var app: RealmSwift.App

    var body: some View {
        if let user = app.currentUser {
            // Create a `flexibleSyncConfiguration` with `initialSubscriptions`.
            // We'll inject this configuration as an environment value to use when opening the realm
            // in the next view, and the realm will open with these initial subscriptions.
            let config = user.flexibleSyncConfiguration(initialSubscriptions: { subs in
                // Check whether the subscription already exists. Adding it more
                // than once causes an error.
                if let foundSubscriptions = subs.first(named: "user_groups") {
                    // Existing subscription found - do nothing
                    return
                } else {
                    // Add queries for any objects you want to use in the app
                    // Linked objects do not automatically get queried, so you
                    // must explicitly query for all linked objects you want to include
                    subs.append(QuerySubscription<ItemGroup>(name: "user_groups") {
                        // Query for objects where the ownerId is equal to the app's current user's id
                        // This means the app's current user can read and write their own data
                        $0.ownerId == user.id
                    })
                    subs.append(QuerySubscription<Item>(name: "user_items") {
                        $0.ownerId == user.id
                    })
                }
            })
            OpenSyncedRealmView()
                .environment(\.realmConfiguration, config)
        } else {
            // If there is no user logged in, show the login view.
            LoginView()
        }
    }
}

/// This view opens a synced realm.
struct OpenSyncedRealmView: View {
    // We've injected a `flexibleSyncConfiguration` as an environment value,
    // so `@AsyncOpen` here opens a realm using that configuration.
    @AsyncOpen(appId: YOUR_APP_SERVICES_APP_ID_HERE, timeout: 4000) var asyncOpen
    
    var body: some View {
        // Because we are setting the `ownerId` to the `user.id`, we need
        // access to the app's current user in this view.
        let user = app?.currentUser
        switch asyncOpen {
        // Starting the Realm.asyncOpen process.
        // Show a progress view.
        case .connecting:
            ProgressView()
        // Waiting for a user to be logged in before executing
        // Realm.asyncOpen.
        case .waitingForUser:
            ProgressView("Waiting for user to log in...")
        // The realm has been opened and is ready for use.
        // Show the content view.
        case .open(let realm):
            ItemsView(itemGroup: {
                if realm.objects(ItemGroup.self).count == 0 {
                    try! realm.write {
                        // Because we're using `ownerId` as the queryable field, we must
                        // set the `ownerId` to equal the `user.id` when creating the object
                        realm.add(ItemGroup(value: ["ownerId":user!.id]))
                    }
                }
                return realm.objects(ItemGroup.self).first!
            }(), leadingBarButton: AnyView(LogoutButton())).environment(\.realm, realm)
            // The realm is currently being downloaded from the server.
            // Show a progress view.
        case .progress(let progress):
            ProgressView(progress)
        // Opening the Realm failed.
        // Show an error view.
        case .error(let error):
            ErrorView(error: error)
        }
    }
}

struct ErrorView: View {
    var error: Error
        
    var body: some View {
        VStack {
            Text("Error opening the realm: \(error.localizedDescription)")
        }
    }
}
    
// MARK: Authentication Views
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

struct LoginView_Previews: PreviewProvider {
    static var previews: some View {
        LoginView()
    }
}

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

// MARK: Item Views
/// The screen containing a list of items in an ItemGroup. Implements functionality for adding, rearranging,
/// and deleting items in the ItemGroup.
struct ItemsView: View {
    @ObservedRealmObject var itemGroup: ItemGroup

    /// The button to be displayed on the top left.
    var leadingBarButton: AnyView?

    var body: some View {
        let user = app?.currentUser
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
                        // Because we are using Flexible Sync, we must set
                        // the item's ownerId to the current user.id when we create it.
                        $itemGroup.items.append(Item(value: ["ownerId":user!.id]))
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
