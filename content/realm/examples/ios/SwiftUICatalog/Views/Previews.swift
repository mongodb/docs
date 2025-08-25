// :replace-start: {
//   "terms": {
//     "SwiftUI_": ""
//   }
// }
import RealmSwift
import SwiftUI

// :snippet-start: preview-detail-view
struct DogDetailView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationView {
            DogDetailView(dog: SwiftUI_Dog.dog1)
        }
    }
}
// :snippet-end:

// :snippet-start: preview-with-realm
struct ProfileView_Previews: PreviewProvider {
    static var previews: some View {
        let realm = SwiftUI_Person.previewRealm
        let profile = realm.objects(Profile.self)
        ProfileView(profile: profile.first!)
    }
}
// :snippet-end:

// :snippet-start: preview-view-associated-with-sync
struct LoginView_Previews: PreviewProvider {
    static var previews: some View {
        LoginView()
    }
}
// :snippet-end:

// :snippet-start: preview-dogs-view
struct DogsView_Previews: PreviewProvider {
    static var previews: some View {
        let realm = SwiftUI_Person.previewRealm
        DogsView()
            .environment(\.realm, realm)
    }
}
// :snippet-end:
// :replace-end:
