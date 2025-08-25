struct LocalOnlyContentView: View {
    // Implicitly use the default realm's objects(Dog.self)
    @ObservedResults(Dog.self) var dogs
    
    var body: some View {
        if dogs.first != nil {
            // If dogs exist, go to the DogsView
            DogsView()
        } else {
            // If there is no Dog object, add one here.
            AddDogView()
        }
    }
}
