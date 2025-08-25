struct DogDetailView: View {
    @ObservedRealmObject var dog: Dog
    
    var body: some View {
        VStack {
            Text(dog.name)
                .font(.title2)
            Text("\(dog.name) is a \(dog.breed)")
            AsyncImage(url: dog.profileImageUrl) { image in
                            image.resizable()
                        } placeholder: {
                            ProgressView()
                        }
                        .aspectRatio(contentMode: .fit)
                        .frame(width: 150, height: 150)
            Text("Favorite toy: \(dog.favoriteToy)")
        }
    }
}
