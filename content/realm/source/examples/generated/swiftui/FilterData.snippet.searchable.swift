struct SearchableDogsView: View {
    @ObservedResults(Dog.self) var dogs
    @State private var searchFilter = ""
    
    var body: some View {
        NavigationView {
            // The list shows the dogs in the realm.
            List {
                ForEach(dogs) { dog in
                    DogRow(dog: dog)
                }
            }
            .searchable(text: $searchFilter,
                        collection: $dogs,
                        keyPath: \.name) {
                ForEach(dogs) { dogsFiltered in
                    Text(dogsFiltered.name).searchCompletion(dogsFiltered.name)
                }
            }
        }
    }
}
