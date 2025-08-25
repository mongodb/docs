// :replace-start: {
//   "terms": {
//     "SwiftUI_": ""
//   }
// }
import SwiftUI
import RealmSwift

struct PersonDogView: View {
    @ObservedRealmObject var person: SwiftUI_Person
    @State var isInAddDogView = false
    
    var body: some View {
        NavigationView {
            VStack {
                Text("Person \(person.firstName) has \(person.dogs.count) dogs")
                NavigationLink(destination: AddDogToPersonView(person: person, isInAddDogView: $isInAddDogView), isActive: $isInAddDogView) {
                    Button(action: {
                        self.isInAddDogView = true
                    }) {
                        Text("Add dog")
                    }
                }
            }
        }
    }
}

// :snippet-start: add-dog-to-person-view
struct AddDogToPersonView: View {
    @ObservedRealmObject var person: SwiftUI_Person
    @Binding var isInAddDogView: Bool
    @State var name = ""
    @State var breed = ""
    @State var weight = 0
    @State var favoriteToy = ""
    @State var profileImageUrl: URL?
    
    var body: some View {
        Form {
            TextField("Dog's name", text: $name)
            TextField("Dog's breed", text: $breed)
            TextField("Dog's weight", value: $weight, format: .number)
            TextField("Dog's favorite toy", text: $favoriteToy)
            TextField("Image link", value: $profileImageUrl, format: .url)
                            .keyboardType(.URL)
                            .textInputAutocapitalization(.never)
                            .disableAutocorrection(true)
            Section {
                Button(action: {
                    let dog = createDog(name: name, breed: breed, weight: weight, favoriteToy: favoriteToy, profileImageUrl: profileImageUrl)
                    $person.dogs.append(dog) // :emphasize:
                    isInAddDogView.toggle()
                }) {
                    Text("Save")
                }
                Button(action: {
                    isInAddDogView.toggle()
                }) {
                    Text("Cancel")
                }
            }
        }
    }
}
// :snippet-end:

func createDog(name: String, breed: String, weight: Int, favoriteToy: String, profileImageUrl: URL?) -> SwiftUI_Dog {
    let newDog = SwiftUI_Dog()
    newDog.name = name
    newDog.breed = breed
    newDog.weight = weight
    newDog.favoriteToy = favoriteToy
    if let urlExists = profileImageUrl {
        newDog.profileImageUrl = urlExists
    }
    return newDog
}

@MainActor
func addDogToPerson(person: SwiftUI_Person, dog: SwiftUI_Dog) {
    let personRealm = person.thaw()!.realm!
    let thawedPerson = person.thaw()
    try! personRealm.write {
        thawedPerson!.dogs.append(dog)
    }
}

//struct AddDogToPersonView_Previews: PreviewProvider {
//    static var previews: some View {
//        AddDogToPersonView(person: SwiftUI_Person.person)
//    }
//}
// :replace-end:
