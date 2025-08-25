// :replace-start: {
//   "terms": {
//     "SwiftUI_": ""
//   }
// }
import RealmSwift
import SwiftUI

// :snippet-start: searchable
struct SearchableDogsView: View {
    @ObservedResults(SwiftUI_Dog.self) var dogs
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
// :snippet-end:

// :snippet-start: nspredicate-filter
struct FilterDogsViewNSPredicate: View {
    @ObservedResults(SwiftUI_Dog.self, filter: NSPredicate(format: "weight > 40")) var dogs
    
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
// :snippet-end:

// :snippet-start: type-safe-query-filter
struct FilterDogsViewTypeSafeQuery: View {
    @ObservedResults(SwiftUI_Dog.self, where: ( { $0.weight > 40 } )) var dogs
    
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
// :snippet-end:

// :snippet-start: sort-descriptor
struct SortedDogsView: View {
    @ObservedResults(SwiftUI_Dog.self,
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
// :snippet-end:

struct SectionedDogsViewFiltered: View {
    // :snippet-start: observed-filtered-sectioned-results
    @ObservedSectionedResults(SwiftUI_Dog.self,
                              sectionKeyPath: \.firstLetter,
                              where: ( { $0.weight > 40 } )) var dogs
    // :snippet-end:

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

// :replace-end:
