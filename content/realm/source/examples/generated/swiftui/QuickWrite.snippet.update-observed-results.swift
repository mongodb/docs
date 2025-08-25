struct DogsListView: View {
    @ObservedResults(Dog.self) var dogs
    
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
                        $dogs.append(Dog(value: ["name":"Bandido"]))
                    }) { Image(systemName: "plus") }
                    .accessibilityIdentifier("addDogButton")
                }.padding()
            }
        }
    }
}
