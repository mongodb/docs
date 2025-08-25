// :replace-start: {
//   "terms": {
//     "SwiftUI_": ""
//   }
// }
import RealmSwift
import SwiftUI

// :snippet-start: local-only-view
struct LocalOnlyContentView: View {
    // :snippet-start: implicitly-open-realm
    // Implicitly use the default realm's objects(Dog.self)
    @ObservedResults(SwiftUI_Dog.self) var dogs
    // :snippet-end:
    
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
// :snippet-end:

struct SetUpDogsView: View {
    var body: some View {
        let dogPreviewRealm = SwiftUI_Dog.previewRealmJustDogs
        LocalOnlyContentView()
            .environment(\.realm, dogPreviewRealm)
    }
}

// :snippet-start: implicitly-open-realm-and-pass-objects
struct DogsView: View {
    @ObservedResults(SwiftUI_Dog.self) var dogs

    /// The button to be displayed on the top left.
    var leadingBarButton: AnyView?

    var body: some View {
        // :remove-start:
        let dogsCount = dogs.count
        Text("Successfully called DogsView and it contains \(dogsCount) Dogs")
        // :remove-end:
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
// :snippet-end:

struct DogRow: View {
    @ObservedRealmObject var dog: SwiftUI_Dog

    var body: some View {
        // You can click an item in the list to navigate to an edit details screen.
        NavigationLink(destination: DogDetailView(dog: dog)) {
            HStack {
                AsyncImage(url: dog.profileImageUrl) { image in
                                image.resizable()
                            } placeholder: {
                                ProgressView()
                            }
                            .aspectRatio(contentMode: .fit)
                            .frame(width: 50, height: 50)
                Text(dog.name)
                Spacer()
            }
        }
    }
}

struct AddDogView: View {
    var body: some View {
        Text("This is a placeholder for the AddDogView")
    }
}

// :snippet-start: dog-detail-view
struct DogDetailView: View {
    @ObservedRealmObject var dog: SwiftUI_Dog
    
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
// :snippet-end:

struct ProfileView: View {
    @ObservedRealmObject var profile: Profile
    
    var body: some View {
        VStack {
            Spacer()
            Text(profile.firstName)
            Spacer()
            AsyncImage(url: profile.profileImageUrl) { image in
                            image.resizable()
                        } placeholder: {
                            ProgressView()
                        }
                        .aspectRatio(contentMode: .fit)
                        .frame(width: 150, height: 150)
            Spacer()
            Text(profile.businessUnit.rawValue)
            Spacer()
            List {
                ForEach(profile.dogs) { dog in
                    DogRow(dog: dog)
                }.onDelete(perform: $profile.dogs.remove)
            }.listStyle(GroupedListStyle())
        }
    }
}

// :replace-end:
