struct SectionedDogsView: View {
    @ObservedSectionedResults(Dog.self,
                              sectionKeyPath: \.firstLetter) var dogs

    /// The button to be displayed on the top left.
    var leadingBarButton: AnyView?

    var body: some View {
        NavigationView {
            VStack {
                // The list shows the dogs in the realm, split into sections according to the keypath.
                List {
                    ForEach(dogs) { section in
                        Section(header: Text(section.key)) {
                            ForEach(section) { dog in
                                DogRow(dog: dog)
                            }
                        }
                    }
                }
                .listStyle(GroupedListStyle())
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
