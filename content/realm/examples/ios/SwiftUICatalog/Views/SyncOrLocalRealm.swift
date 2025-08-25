import SwiftUI
import RealmSwift

let dogPreviewRealm = SwiftUI_Dog.previewRealmJustDogs

// :snippet-start: update-schema-version
let config = Realm.Configuration(schemaVersion: 2)
// :snippet-end:

struct FlexibleSyncOrLocalRealmView: View {
    var app: RealmSwift.App?
    
    var body: some View {
        // Using Sync?
        if let app = app {
            FlexibleSyncContentView(flexibleSyncApp: app)
        } else {
            LocalOnlyContentView()
            // :remove-start:
                .environment(\.realm, dogPreviewRealm)
            // :remove-end:
            // :state-start: pass-to-local-view
            // :snippet-start: pass-config-environment-object
                .environment(\.realmConfiguration, config)
            // :snippet-end:
            // :state-end:
        }
    }
}
