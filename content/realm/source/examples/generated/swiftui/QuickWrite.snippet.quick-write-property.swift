struct EditDogDetails: View {
    @ObservedRealmObject var dog: Dog
    
    var body: some View {
        VStack {
            Text(dog.name)
                .font(.title2)
            TextField("Favorite toy", text: $dog.favoriteToy)
        }
    }
}
