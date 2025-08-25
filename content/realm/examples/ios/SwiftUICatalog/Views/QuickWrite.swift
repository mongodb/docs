// :replace-start: {
//   "terms": {
//     "SwiftUI_": ""
//   }
// }
import RealmSwift
import SwiftUI

struct DogDetailsView: View {
    @ObservedRealmObject var dog: SwiftUI_Dog
    @State var selection: Int? = nil
    
    var body: some View {
        NavigationView {
            VStack {
                Text(dog.name)
                    .font(.title2)
                Text(dog.favoriteToy)
                NavigationLink(destination: EditDogDetails(dog: dog), tag: 1, selection: $selection) {
                    Button(action: {
                        print("Edit tapped")
                        self.selection = 1
                    }) {
                        Text("Edit favorite toy")
                    }
                }
            }
        }
    }
}

// :snippet-start: quick-write-property
struct EditDogDetails: View {
    @ObservedRealmObject var dog: SwiftUI_Dog
    
    var body: some View {
        VStack {
            Text(dog.name)
                .font(.title2)
            TextField("Favorite toy", text: $dog.favoriteToy)
        }
    }
}
// :snippet-end:

// :snippet-start: update-observed-results
struct DogsListView: View {
    @ObservedResults(SwiftUI_Dog.self) var dogs
    
    var body: some View {
        NavigationView {
            VStack {
                // The list shows the dogs in the realm.
                List {
                    ForEach(dogs) { dog in
                        DogRow(dog: dog)
                        // Because `$dogs` here accesses an ObservedResults
                        // collection, we can remove the specific dog from the collection.
                        // Regular Realm Results are immutable, but you can write directly
                        // to an `@ObservedResults` collection.
                    }.onDelete(perform: $dogs.remove)
                }.listStyle(GroupedListStyle())
                    .navigationBarTitle("Dogs", displayMode: .large)
                    .navigationBarBackButtonHidden(true)
                // Action bar at bottom contains Add button.
                HStack {
                    Spacer()
                    Button(action: {
                        // The bound collection automatically
                        // handles write transactions, so we can
                        // append directly to it. This example assumes
                        // we have some values to populate the Dog object.
                        $dogs.append(SwiftUI_Dog(value: ["name":"Bandido"]))
                    }) { Image(systemName: "plus") }
                    .accessibilityIdentifier("addDogButton")
                }.padding()
            }
        }
    }
}
// :snippet-end:
// :replace-end:
