struct FilterDogsViewTypeSafeQuery: View {
    @ObservedResults(Dog.self, where: ( { $0.weight > 40 } )) var dogs
    
    var body: some View {
        NavigationView {
            // The list shows the dogs in the realm.
            List {
                ForEach(dogs) { dog in
                    DogRow(dog: dog)
                }
            }
        }
    }
}
