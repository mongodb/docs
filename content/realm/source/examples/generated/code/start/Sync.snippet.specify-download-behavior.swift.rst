.. code-block:: swift
   :emphasize-lines: 7

   func getRealmAfterDownloadingUpdates() async throws -> Realm {
       let app = App(id: APPID)
       let user = try await app.login(credentials: Credentials.anonymous)
       var configuration = user.flexibleSyncConfiguration()
       configuration.objectTypes = [FlexibleSync_Task.self, FlexibleSync_Team.self]

       let realm = try await Realm(configuration: configuration, downloadBeforeOpen: .always) 
       print("Successfully opened realm after downloading: \(realm)")
       return realm
   }

   let realm = try await getRealmAfterDownloadingUpdates()
   print("The open realm is: \(realm)")
   // Add subscription and work with the realm
