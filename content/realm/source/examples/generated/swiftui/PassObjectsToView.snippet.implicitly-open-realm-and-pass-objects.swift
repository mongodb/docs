struct DogsView: View {
    @ObservedResults(Dog.self) var dogs

    /// The button to be displayed on the top left.
    var leadingBarButton: AnyView?

    var body: some View {
        NavigationView {
            VStack {
                // The list shows the dogs in the realm.
                // The ``@ObservedResults`` above implicitly opens a realm and retrieves
                // all the Dog objects. We can then pass those objects to views further down the
                // hierarchy.
                List {
                    ForEach(dogs) { dog in
                        DogRow(dog: dog)
                    }.onDelete(perform: $dogs.remove)
                }.listStyle(GroupedListStyle())
                    .navigationBarTitle("Dogs", displayMode: .large)
                    .navigationBarBackButtonHidden(true)
                    .navigationBarItems(
                        leading: self.leadingBarButton,
                        // Edit button on the right to enable rearranging items
                        trailing: EditButton())
            }.padding()
        }
    }
}
