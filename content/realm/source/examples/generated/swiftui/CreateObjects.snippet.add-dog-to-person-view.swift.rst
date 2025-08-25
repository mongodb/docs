.. code-block:: swift
   :emphasize-lines: 23

   struct AddDogToPersonView: View {
       @ObservedRealmObject var person: Person
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
                       $person.dogs.append(dog) 
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
