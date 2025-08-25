struct SortedDogsView: View {
    @ObservedResults(Dog.self,
                     sortDescriptor: SortDescriptor(keyPath: "name",
                        ascending: true)) var dogs
    
    var body: some View {
        NavigationView {
            // The list shows the dogs in the realm, sorted by name
            List(dogs) { dog in
                DogRow(dog: dog)
            }
        }
    }
}
