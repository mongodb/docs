// :replace-start: {
//   "terms": {
//     "AsymmetricSync_": "",
//     "FLEX_SYNC_APP_ID": "INSERT_APP_ID_HERE"
//   }
// }

import XCTest
import RealmSwift

// :snippet-start: asymmetric-model
class AsymmetricSync_WeatherSensor: AsymmetricObject {
    @Persisted(primaryKey: true) var _id: ObjectId
    @Persisted var deviceId: String
    @Persisted var temperatureInFahrenheit: Float
    @Persisted var barometricPressureInHg: Float
    @Persisted var windSpeedInMph: Int
    // :remove-start:
    override class func shouldIncludeInDefaultSchema() -> Bool {
        return false
    }
    // :remove-end:
}
// :snippet-end:

class AsymmetricSync: XCTestCase {
    func testAsymmetricSync() async {
        // :snippet-start: connect-and-authenticate
        let app = App(id: FLEX_SYNC_APP_ID)
        do {
            let user = try await login()
            await openSyncedRealm(user: user)
        } catch {
            print("Error logging in: \(error.localizedDescription)")
        }

        func login() async throws -> User {
            let user = try await app.login(credentials: .anonymous)
            return user
        }
        // :snippet-end:

        // :snippet-start: open-asymmetric-sync-realm
        @MainActor
        func openSyncedRealm(user: User) async {
            do {
                var asymmetricConfig = user.flexibleSyncConfiguration()
                asymmetricConfig.objectTypes = [AsymmetricSync_WeatherSensor.self]
                let asymmetricRealm = try await Realm(configuration: asymmetricConfig)
                await useRealm(asymmetricRealm, user)
            } catch {
                print("Error opening realm: \(error.localizedDescription)")
            }
        }
        // :snippet-end:
        // :snippet-start: create-asymmetric-object
        @MainActor
        func useRealm(_ asymmetricRealm: Realm, _ user: User) async {
            try! asymmetricRealm.write {
                asymmetricRealm.create(AsymmetricSync_WeatherSensor.self,
                                       value: [ "_id": ObjectId.generate(),
                                                "deviceId": "WX1278UIT",
                                                "temperatureInFahrenheit": 66.7,
                                                "barometricPressureInHg": 29.65,
                                                "windSpeedInMph": 2
                                                ])
            }
            // :remove-start:
            // Add a delay to give the document time to sync
            sleep(10)
            // Verify the document was added, and then delete it for cleanup.
            let client = app.currentUser!.mongoClient("mongodb-atlas")
            let database = client.database(named: "ios-flexible")
            let collection = database.collection(withName: "AsymmetricSync_WeatherSensor")
            let weatherSensorDocument: Document = ["deviceId": "WX1278UIT"]
            do {
                let foundWeatherSensorDocuments = try await collection.find(filter: weatherSensorDocument)
                print("Found these matching documents: \(foundWeatherSensorDocuments)")
                XCTAssertNotNil(foundWeatherSensorDocuments)
                let deletedResult = try await collection.deleteManyDocuments(filter: weatherSensorDocument)
                print("Deleted documents: \(deletedResult)")
            } catch {
                print("Error finding or deleting documents: \(error.localizedDescription)")
            }
            // :remove-end:
        }
        // :snippet-end:
    }
}
// :replace-end:
