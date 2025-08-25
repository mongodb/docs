// :replace-start: {
//   "terms": {
//     "FlexibleSync_": ""
//   }
// }
// swiftlint:disable type_body_length

let APPID = "swift-flexible-vkljj"

import XCTest
import RealmSwift

// :snippet-start: flexible-sync-models
class FlexibleSync_Task: Object {
    @Persisted(primaryKey: true) var _id: ObjectId
    @Persisted var taskName: String
    @Persisted var assignee: String?
    @Persisted var completed: Bool
    @Persisted var progressMinutes: Int
    @Persisted var dueDate: Date
}

class FlexibleSync_Team: Object {
    @Persisted(primaryKey: true) var _id: ObjectId
    @Persisted var teamName: String
    @Persisted var tasks: List<FlexibleSync_Task>
    @Persisted var members: List<String>
}
// :snippet-end:

extension FlexibleSync_Task {
    convenience init(taskName: String, assignee: String?, completed: Bool, progressMinutes: Int, dueDate: Date) {
        self.init()
        self.taskName = taskName
        self.assignee = assignee
        self.completed = completed
        self.progressMinutes = progressMinutes
        self.dueDate = dueDate
    }
}

// There are a lot of `@MainActor` annotations in this test class.
// I'm not annotating the entire class with `@MainActor` because I want
// the errors to show me the places where I need to add `@MainActor`
// annotations in visible code examples.
// This means individually annotating tests since the tearDown func
// uses @MainActor. Otherwise Realm throws due to incorrect thread access.
class FlexibleSync: SwiftSyncTestCase {
    @globalActor actor CustomGlobalActor: GlobalActor {
        static var shared = CustomGlobalActor()
    }

    func testAddSingleSubscription() async {
        let app = App(id: APPID)

        do {
            let credentials = emailPasswordCredentials(app: app)
            let user = try await app.login(credentials: credentials)
            var flexSyncConfig = user.flexibleSyncConfiguration()
            flexSyncConfig.objectTypes = [FlexibleSync_Task.self, FlexibleSync_Team.self]
            do {
                // :snippet-start: add-single-subscription
                let realm = try await getRealmWithSingleSubscription()
                
                // Opening a realm and accessing it must be done from the same thread.
                // Marking this function as `@MainActor` avoids threading-related issues.
                @MainActor
                func getRealmWithSingleSubscription() async throws -> Realm {
                    let realm = try await Realm(configuration: flexSyncConfig)
                    let subscriptions = realm.subscriptions
                    try await subscriptions.update {
                       subscriptions.append(
                          QuerySubscription<FlexibleSync_Team> {
                             $0.teamName == "Developer Education"
                          })
                    }
                    XCTAssertEqual(subscriptions.count, 1) // :remove:
                    return realm
                }
                // :snippet-end:
                print("Successfully opened realm: \(realm)")
            } catch {
                print("Failed to open realm: \(error.localizedDescription)")
                // handle error
            }
        } catch {
            fatalError("Login failed: \(error.localizedDescription)")
        }
    }

    func testAddMultipleSubscriptions() async {
        let app = App(id: APPID)

        do {
            let credentials = emailPasswordCredentials(app: app)
            let user = try await app.login(credentials: credentials)
            var flexSyncConfig = user.flexibleSyncConfiguration()
            flexSyncConfig.objectTypes = [FlexibleSync_Task.self, FlexibleSync_Team.self]
            do {
                // :snippet-start: add-multiple-subscriptions
                let realm = try await getRealmWithMultipleSubscriptions()
                
                // Opening a realm and accessing it must be done from the same thread.
                // Marking this function as `@MainActor` avoids threading-related issues.
                @MainActor
                func getRealmWithMultipleSubscriptions() async throws -> Realm {
                    let realm = try await Realm(configuration: flexSyncConfig)
                    let subscriptions = realm.subscriptions
                    try await subscriptions.update {
                        subscriptions.append(
                            QuerySubscription<FlexibleSync_Task>(name: "completed-tasks") {
                                 $0.completed == true
                        })
                        subscriptions.append(
                            QuerySubscription<FlexibleSync_Team> {
                              $0.teamName == "Developer Education"
                        })
                    }
                    XCTAssertEqual(subscriptions.count, 2) // :remove:
                    return realm
                }
                // :snippet-end:
                print("Successfully opened realm: \(realm)")
            } catch {
                print("Failed to open realm: \(error.localizedDescription)")
                // handle error
            }
        } catch {
            fatalError("Login failed: \(error.localizedDescription)")
        }
    }

    @MainActor
    func testAddQuerySubscriptionsWithAndWithoutName() async {
        let app = App(id: APPID)

        do {
            let credentials = emailPasswordCredentials(app: app)
            let user = try await app.login(credentials: credentials)
            var flexSyncConfig = user.flexibleSyncConfiguration()
            flexSyncConfig.objectTypes = [FlexibleSync_Task.self, FlexibleSync_Team.self]
            do {
                let realm = try await Realm(configuration: flexSyncConfig)
                let subscriptions = realm.subscriptions
                try await subscriptions.update {
                    subscriptions.append(
                        // :snippet-start: query-subscription-by-name
                        QuerySubscription<FlexibleSync_Task>(name: "long-running-completed") {
                            $0.completed == true && $0.progressMinutes > 120
                        }
                        // :snippet-end:
                    )
                    subscriptions.append(
                        // :snippet-start: query-subscription-without-name
                        QuerySubscription<FlexibleSync_Team> {
                           $0.teamName == "Developer Education"
                        }
                        // :snippet-end:
                    )
                }
                print("Successfully opened realm: \(realm)")
                XCTAssertEqual(subscriptions.count, 2)
            } catch {
                print("Failed to open realm: \(error.localizedDescription)")
                // handle error
            }
        } catch {
            fatalError("Login failed: \(error.localizedDescription)")
        }
    }

    func testAddSubscriptionWithOnComplete() {
        let expectation = XCTestExpectation(description: "it completes")
        let app = App(id: APPID)
        let credentials = emailPasswordCredentials(app: app)
        app.login(credentials: credentials) { (result) in
            switch result {
            case .failure(let error):
                fatalError("Login failed: \(error.localizedDescription)")
            case .success:
                // Continue
                print("Successfully logged in to app")
                let user = app.currentUser
                var flexSyncConfig = user?.flexibleSyncConfiguration()
                flexSyncConfig?.objectTypes = [FlexibleSync_Task.self, FlexibleSync_Team.self]
                Realm.asyncOpen(configuration: flexSyncConfig!) { result in
                    switch result {
                    case .failure(let error):
                        print("Failed to open realm: \(error.localizedDescription)")
                        // handle error
                    case .success(let realm):
                        print("Successfully opened realm: \(realm)")
                        // :snippet-start: add-subscription-with-oncomplete
                        let subscriptions = realm.subscriptions
                        subscriptions.update({
                           subscriptions.append(
                              QuerySubscription<FlexibleSync_Task> {
                                 $0.assignee == "John Doe"
                              })
                        }, onComplete: { error in // error is optional
                            if error == nil {
                               // Flexible Sync has updated data to match the subscription
                            } else {
                               // Handle the error
                            }
                         })
                         // :snippet-end:
                        expectation.fulfill()
                    }
                }
            }
        }
        wait(for: [expectation], timeout: 10)
    }

    @MainActor
    func testAddInitialSubscriptions() async {
        let app = App(id: APPID)

        do {
            let credentials = emailPasswordCredentials(app: app)
            let user = try await app.login(credentials: credentials)
            // :snippet-start: add-initial-subscriptions
            var flexSyncConfig = user.flexibleSyncConfiguration(initialSubscriptions: { subs in
                subs.append(
                    QuerySubscription<FlexibleSync_Team> {
                           $0.teamName == "Developer Education"
                        })
            })
            // :snippet-end:
            flexSyncConfig.objectTypes = [FlexibleSync_Task.self, FlexibleSync_Team.self]
            do {
                let realm = try await Realm(configuration: flexSyncConfig)
                print("Successfully opened realm: \(realm)")
                let subscriptions = realm.subscriptions
                XCTAssertEqual(subscriptions.count, 1)
            } catch {
                print("Failed to open realm: \(error.localizedDescription)")
                // handle error
            }
        } catch {
            fatalError("Login failed: \(error.localizedDescription)")
        }
    }

    @MainActor
    func testAddInitialSubscriptionsWithRerunOnOpen() async {
        let app = App(id: APPID)

        // Set up some test data for this code example. We'll create two objects;
        // one that should not be included in the Flexible Sync query, and one that should.
        do {
            let thisUser = try await app.login(credentials: Credentials.anonymous)
            var thisFlexSyncConfig = thisUser.flexibleSyncConfiguration()
            thisFlexSyncConfig.objectTypes = [FlexibleSync_Task.self, FlexibleSync_Team.self]
            do {
                let thisRealm = try await Realm(configuration: thisFlexSyncConfig)
                let subscriptions = thisRealm.subscriptions
                try await subscriptions.update {
                    subscriptions.append(
                        QuerySubscription<FlexibleSync_Task>(name: "all_tasks")
                    )
                }
                print("Successfully opened realm: \(thisRealm)")
                XCTAssertEqual(thisRealm.subscriptions.count, 1)
                try thisRealm.write {
                    thisRealm.deleteAll()
                }
                let currentTask = FlexibleSync_Task()
                currentTask.dueDate = (Date.now + TimeInterval(86400))
                currentTask.taskName = "This task should appear in the Flex Sync realm"
                currentTask.progressMinutes = 20
                currentTask.completed = false
                let pastTask = FlexibleSync_Task()
                pastTask.dueDate = (Date.now - TimeInterval(1200000))
                pastTask.taskName = "This task should be outdated & should not apper in the Flex Sync realm"
                pastTask.progressMinutes = 1
                currentTask.completed = false
                try thisRealm.write {
                    thisRealm.add([currentTask, pastTask])
                }
                let thisTasks = thisRealm.objects(FlexibleSync_Task.self)
                XCTAssertEqual(thisTasks.count, 2)
                print("Successfully added tasks to realm: \(thisTasks)")
                try await subscriptions.update {
                    subscriptions.removeAll()
                }
            } catch {
                print("Failed to open realm: \(error.localizedDescription)")
                // handle error
            }
        } catch {
            fatalError("Login failed: \(error.localizedDescription)")
        }

        do {
            let user = try await app.login(credentials: Credentials.anonymous)
            // :snippet-start: add-initial-subscriptions-rerun-on-open
            // Set the date a week ago and the date a week from now, as those are the dates we'll use
            // in the Flexible Sync query. `rerunOnOpen` lets the app recalculate this query every
            // time the app opens.
            let secondsInAWeek: TimeInterval = 604800
            let dateLastWeek = (Date.now - secondsInAWeek)
            let dateNextWeek = (Date.now + secondsInAWeek)
            var flexSyncConfig = user.flexibleSyncConfiguration(initialSubscriptions: { subs in
                subs.append(
                    QuerySubscription<FlexibleSync_Task> {
                        $0.dueDate > dateLastWeek && $0.dueDate < dateNextWeek
                    })
            }, rerunOnOpen: true)
            // :snippet-end:
            flexSyncConfig.objectTypes = [FlexibleSync_Task.self, FlexibleSync_Team.self]
            do {
                let realm = try await Realm(configuration: flexSyncConfig, downloadBeforeOpen: .always)
                print("Successfully opened realm: \(realm)")
                let subscriptions = realm.subscriptions
                XCTAssertEqual(subscriptions.count, 1)
                let tasks = realm.objects(FlexibleSync_Task.self)
                print("The tasks in the second realm are: \(tasks)")
                XCTAssertEqual(tasks.count, 1)
                try realm.write {
                    realm.deleteAll()
                }
                try await subscriptions.update {
                    subscriptions.removeAll()
                }
                XCTAssertEqual(subscriptions.count, 0)
            } catch {
                print("Failed to open realm: \(error.localizedDescription)")
                // handle error
            }
        } catch {
            fatalError("Login failed: \(error.localizedDescription)")
        }
    }

    func testCheckForSubscriptionBeforeAddingOne() async {
        let app = App(id: APPID)

        do {
            let credentials = emailPasswordCredentials(app: app)
            let user = try await app.login(credentials: credentials)
            var flexSyncConfig = user.flexibleSyncConfiguration()
            flexSyncConfig.objectTypes = [FlexibleSync_Task.self, FlexibleSync_Team.self]
            do {
                // :snippet-start: check-before-adding-subscription
                let realm = try await checkAndAddSubscription()
                
                // Opening a realm and accessing it must be done from the same thread.
                // Marking this function as `@MainActor` avoids threading-related issues.
                @MainActor
                func checkAndAddSubscription() async throws -> Realm {
                    let realm = try await Realm(configuration: flexSyncConfig)
                    let subscriptions = realm.subscriptions
                    let foundSubscription = subscriptions.first(named: "user_team")
                    try await subscriptions.update {
                        if foundSubscription != nil {
                            foundSubscription!.updateQuery(toType: FlexibleSync_Team.self, where: {
                                 $0.teamName == "Developer Education"
                            })
                        } else {
                            subscriptions.append(
                                QuerySubscription<FlexibleSync_Team>(name: "user_team") {
                                  $0.teamName == "Developer Education"
                               })
                        }
                    }
                    XCTAssertEqual(subscriptions.count, 1) // :remove:
                    return realm
                }
                // :snippet-end:
                print("Successfully opened realm: \(realm)")
            } catch {
                print("Failed to open realm: \(error.localizedDescription)")
                // handle error
            }
        } catch {
            fatalError("Login failed: \(error.localizedDescription)")
        }
    }

    func testSubscribeToAllObjectsOfAType() async {
        let app = App(id: APPID)

        do {
            let credentials = emailPasswordCredentials(app: app)
            let user = try await app.login(credentials: credentials)
            var flexSyncConfig = user.flexibleSyncConfiguration()
            flexSyncConfig.objectTypes = [FlexibleSync_Task.self, FlexibleSync_Team.self]
            do {
                // :snippet-start: subscribe-to-all-objects-of-a-type
                let realm = try await subscribeToObjectsOfAType()

                // Opening a realm and accessing it must be done from the same thread.
                // Marking this function as `@MainActor` avoids threading-related issues.
                @MainActor
                func subscribeToObjectsOfAType() async throws -> Realm {
                    let realm = try await Realm(configuration: flexSyncConfig)
                    let subscriptions = realm.subscriptions
                    try await subscriptions.update {
                        subscriptions.append(QuerySubscription<FlexibleSync_Team>(name: "all_teams"))
                    }
                    XCTAssertEqual(subscriptions.count, 1) // :remove
                    return realm
                }
                // :snippet-end:
                print("Successfully opened realm: \(realm)")
            } catch {
                print("Failed to open realm: \(error.localizedDescription)")
                // handle error
            }
        } catch {
            fatalError("Login failed: \(error.localizedDescription)")
        }
    }
    
    func aboutExamples() async throws {
        // :snippet-start: initialize-app-authenticate-user
        let app = App(id: APPID)

        do {
            let credentials = emailPasswordCredentials(app: app)
            let user = try await app.login(credentials: credentials)
            var flexSyncConfig = user.flexibleSyncConfiguration()
            flexSyncConfig.objectTypes = [FlexibleSync_Task.self, FlexibleSync_Team.self]
            do {
                // Open the synced realm and manage Flexible Sync subscriptions
            } catch {
                print("Failed to open realm: \(error.localizedDescription)")
                // handle error
            }
        } catch {
            fatalError("Login failed: \(error.localizedDescription)")
        }
        // :snippet-end:
    }
    
    @MainActor
    func testSubscribeApiWithUnnamedSubscription() async throws {
        let app = App(id: APPID)

        do {
            let credentials = emailPasswordCredentials(app: app)
            let user = try await app.login(credentials: credentials)
            var flexSyncConfig = user.flexibleSyncConfiguration()
            flexSyncConfig.objectTypes = [FlexibleSync_Task.self, FlexibleSync_Team.self]
            do {
                // :snippet-start: subscribe-to-results-unnamed
                let realm = try await Realm(configuration: flexSyncConfig)
                XCTAssertEqual(realm.subscriptions.count, 0) // :remove:
                let results = try await realm.objects(FlexibleSync_Task.self)
                    .where { $0.progressMinutes >= 60 }.subscribe()
                // Go on to work with subscribed results
                // :snippet-end:
                XCTAssertEqual(realm.subscriptions.count, 1)
            } catch {
                print("Failed to open realm: \(error.localizedDescription)")
                // handle error
            }
        } catch {
            fatalError("Login failed: \(error.localizedDescription)")
        }
    }
    
    @MainActor
    func testSubscribeApiWithNamedSubscription() async throws {
        let app = App(id: APPID)

        do {
            let credentials = emailPasswordCredentials(app: app)
            let user = try await app.login(credentials: credentials)
            var flexSyncConfig = user.flexibleSyncConfiguration()
            flexSyncConfig.objectTypes = [FlexibleSync_Task.self, FlexibleSync_Team.self]
            do {
                // :snippet-start: subscribe-to-results-with-name
                let realm = try await Realm(configuration: flexSyncConfig)
                XCTAssertEqual(realm.subscriptions.count, 0) // :remove:
                let results = try await realm.objects(FlexibleSync_Team.self)
                    .where { $0.teamName == "Developer Education" }
                    .subscribe(name: "team_developer_education")
                // Go on to work with subscribed results
                // :snippet-end:
                XCTAssertEqual(realm.subscriptions.count, 1)
                XCTAssertEqual(realm.subscriptions[0]?.name, "team_developer_education")
            } catch {
                print("Failed to open realm: \(error.localizedDescription)")
                // handle error
            }
        } catch {
            fatalError("Login failed: \(error.localizedDescription)")
        }
    }
    
    @MainActor
    func testSubscribeApiOnMainActor() async throws {
        let app = App(id: APPID)

        do {
            let credentials = emailPasswordCredentials(app: app)
            let user = try await app.login(credentials: credentials)
            var flexSyncConfig = user.flexibleSyncConfiguration()
            flexSyncConfig.objectTypes = [FlexibleSync_Task.self, FlexibleSync_Team.self]
            do {
                // :snippet-start: subscribe-to-results-on-main-actor
                let realm = try await Realm(configuration: flexSyncConfig, actor: MainActor.shared)
                XCTAssertEqual(realm.subscriptions.count, 0) // :remove:
                let results = try await realm.objects(FlexibleSync_Team.self)
                    .where { $0.teamName == "Developer Education" }
                    .subscribe(name: "team_developer_education")
                // Go on to work with subscribed results
                // :snippet-end:
                XCTAssertEqual(realm.subscriptions.count, 1)
                XCTAssertEqual(realm.subscriptions[0]?.name, "team_developer_education")
            } catch {
                print("Failed to open realm: \(error.localizedDescription)")
                // handle error
            }
        } catch {
            fatalError("Login failed: \(error.localizedDescription)")
        }
    }
    
    @CustomGlobalActor
    func testSubscribeApiOnCustomActor() async throws {
        let app = App(id: APPID)

        do {
            let credentials = emailPasswordCredentials(app: app)
            let user = try await app.login(credentials: credentials)
            var flexSyncConfig = user.flexibleSyncConfiguration()
            flexSyncConfig.objectTypes = [FlexibleSync_Task.self, FlexibleSync_Team.self]
            do {
                // :snippet-start: subscribe-to-results-on-custom-actor
                let realm = try await Realm(configuration: flexSyncConfig, actor: CustomGlobalActor.shared)
                XCTAssertEqual(realm.subscriptions.count, 0) // :remove:
                let results = try await realm.objects(FlexibleSync_Team.self)
                    .where { $0.teamName == "Developer Education" }
                    .subscribe(name: "team_developer_education")
                // Go on to work with subscribed results
                // :snippet-end:
                XCTAssertEqual(realm.subscriptions.count, 1)
                XCTAssertEqual(realm.subscriptions[0]?.name, "team_developer_education")
            } catch {
                print("Failed to open realm: \(error.localizedDescription)")
                // handle error
            }
        } catch {
            fatalError("Login failed: \(error.localizedDescription)")
        }
    }
    
    @MainActor
    func setupWaitForSyncTest() async throws {
        let app = App(id: APPID)
        
        do {
            let user = try await app.login(credentials: Credentials.anonymous)
            var flexSyncConfig = user.flexibleSyncConfiguration()
            flexSyncConfig.objectTypes = [FlexibleSync_Task.self, FlexibleSync_Team.self]
            
            // Set up test
            do {
                let setupRealm = try await Realm(configuration: flexSyncConfig)
                let setupRealmSubscriptions = setupRealm.subscriptions
                XCTAssertEqual(setupRealm.subscriptions.count, 0)
                let developerEducationTeamResults = try await setupRealm.objects(FlexibleSync_Team.self).where { $0.teamName == "Developer Education" }.subscribe()
                XCTAssertEqual(setupRealm.subscriptions.count, 1)
                let developerEducationTeam = FlexibleSync_Team(value: ["teamName": "Developer Education"])
                try setupRealm.write {
                    setupRealm.add(developerEducationTeam)
                    developerEducationTeam.members.append("Bob Smith")
                }
                XCTAssertEqual(developerEducationTeamResults.count, 1)
                try await setupRealmSubscriptions.update {
                    setupRealmSubscriptions.removeAll()
                }
                XCTAssertEqual(setupRealmSubscriptions.count, 0)
            } catch {
                print("Failed to open realm: \(error.localizedDescription)")
            }
        }
    }
    
    @MainActor
    func tearDownWaitForSyncTest() async throws {
        let app = App(id: APPID)

        do {
            let user = try await app.login(credentials: Credentials.anonymous)
            var flexSyncConfig = user.flexibleSyncConfiguration()
            flexSyncConfig.objectTypes = [FlexibleSync_Task.self, FlexibleSync_Team.self]
            // Remove object for teardown
            do {
                let cleanupRealm = try await Realm(configuration: flexSyncConfig)
                let cleanupDeveloperEducationResults = try await cleanupRealm.objects(FlexibleSync_Team.self).where { $0.teamName == "Developer Education" }.subscribe(waitForSync: .always)
                XCTAssertEqual(cleanupDeveloperEducationResults.count, 1)
                try cleanupRealm.write {
                    cleanupRealm.deleteAll()
                }
                let resultsAfterCleanup = cleanupRealm.objects(FlexibleSync_Team.self).where { $0.teamName == "Developer Education" }
                XCTAssertEqual(resultsAfterCleanup.count, 0)
            } catch {
                print("Failed to open realm: \(error.localizedDescription)")
            }
        } catch {
            fatalError("Login failed: \(error.localizedDescription)")
        }
    }
    
    @MainActor
    func testSubscribeApiWaitForSync() async throws {

        do {
            try await setupWaitForSyncTest()
            
            let app = App(id: APPID)
            let user = try await app.login(credentials: Credentials.anonymous)
            var flexSyncConfig = user.flexibleSyncConfiguration()
            flexSyncConfig.objectTypes = [FlexibleSync_Task.self, FlexibleSync_Team.self]
            
            do {
                // :snippet-start: subscribe-wait-for-sync
                let realm = try await Realm(configuration: flexSyncConfig)
                XCTAssertEqual(realm.subscriptions.count, 0) // :remove:
                let results = try await realm.objects(FlexibleSync_Team.self)
                    .where { $0.members.contains("Bob Smith") }
                    .subscribe(
                        name: "bob_smith_teams",
                        waitForSync: .onCreation)
                // After waiting for sync, the results set contains all the objects
                // that match the query - in our case, 1
                print("The number of teams that have Bob Smith as a member is \(results.count)")
                // :snippet-end:
                XCTAssertEqual(realm.subscriptions.count, 1)
                XCTAssertEqual(results.count, 1)
            } catch {
                print("Failed to open realm: \(error.localizedDescription)")
                // handle error
            }
            
            try await tearDownWaitForSyncTest()
        } catch {
            fatalError("Login failed: \(error.localizedDescription)")
        }
    }
    
    @MainActor
    func testSubscribeApiUnsubscribeSpecificSubscription() async throws {
        let app = App(id: APPID)

        do {
            let credentials = emailPasswordCredentials(app: app)
            let user = try await app.login(credentials: credentials)
            var flexSyncConfig = user.flexibleSyncConfiguration()
            flexSyncConfig.objectTypes = [FlexibleSync_Task.self, FlexibleSync_Team.self]
            do {
                // :snippet-start: subscribe-api-unsubscribe
                let realm = try await Realm(configuration: flexSyncConfig)
                XCTAssertEqual(realm.subscriptions.count, 0) // :remove:
                let results = try await realm.objects(FlexibleSync_Task.self).where { $0.completed == false }.subscribe()
                // Go on to work with subscribed results.
                XCTAssertEqual(realm.subscriptions.count, 1) // :remove:
                
                // Later...
                results.unsubscribe()
                // :snippet-end:
                XCTAssertEqual(realm.subscriptions.count, 0)
            } catch {
                print("Failed to open realm: \(error.localizedDescription)")
                // handle error
            }
        } catch {
            fatalError("Login failed: \(error.localizedDescription)")
        }
    }

    func testUpdateSubscription() async {
        let app = App(id: APPID)

        do {
            let credentials = emailPasswordCredentials(app: app)
            let user = try await app.login(credentials: credentials)
            var flexSyncConfig = user.flexibleSyncConfiguration()
            flexSyncConfig.objectTypes = [FlexibleSync_Task.self, FlexibleSync_Team.self]
            do {
                // :snippet-start: update-subscription
                let realm = try await getRealmWithUpdatedSubscriptions()
                
                // Opening a realm and accessing it must be done from the same thread.
                // Marking this function as `@MainActor` avoids threading-related issues.
                @MainActor
                func getRealmWithUpdatedSubscriptions() async throws -> Realm {
                    let realm = try await Realm(configuration: flexSyncConfig)
                    let subscriptions = realm.subscriptions
                    // :remove-start:
                    // Add subscription to update
                    try await subscriptions.update {
                        subscriptions.append(QuerySubscription<FlexibleSync_Team> {
                            $0.teamName == "Developer Education"
                        })
                    }
                    XCTAssertEqual(subscriptions.count, 1)
                    // :remove-end:
                    try await subscriptions.update {
                        if let foundSubscription = subscriptions.first(ofType: FlexibleSync_Team.self, where: {
                            $0.teamName == "Developer Education"
                        }) {
                            foundSubscription.updateQuery(toType: FlexibleSync_Team.self, where: {
                                $0.teamName == "Documentation"
                            })
                        }
                    }
                    XCTAssertEqual(subscriptions.count, 1) // :remove:
                    return realm
                }
                // :snippet-end:
                print("Successfully opened realm: \(realm)")
            } catch {
                print("Failed to open realm: \(error.localizedDescription)")
                // handle error
            }
        } catch {
            fatalError("Login failed: \(error.localizedDescription)")
        }
    }

    func testUpdateSubscriptionByName() async {
        let app = App(id: APPID)

        do {
            let credentials = emailPasswordCredentials(app: app)
            let user = try await app.login(credentials: credentials)
            var flexSyncConfig = user.flexibleSyncConfiguration()
            flexSyncConfig.objectTypes = [FlexibleSync_Task.self, FlexibleSync_Team.self]
            do {
                // :snippet-start: update-subscription-by-name
                let realm = try await getRealmWithUpdatedSubscriptionName()
                
                // Opening a realm and accessing it must be done from the same thread.
                // Marking this function as `@MainActor` avoids threading-related issues.
                @MainActor
                func getRealmWithUpdatedSubscriptionName() async throws -> Realm {
                    let realm = try await Realm(configuration: flexSyncConfig)
                    let subscriptions = realm.subscriptions
                    // :remove-start:
                    // Add subscription to update
                    try await subscriptions.update {
                        subscriptions.append(QuerySubscription<FlexibleSync_Team>(name: "user-team") {
                            $0.teamName == "Docs"
                         })
                    }
                    XCTAssertEqual(subscriptions.count, 1)
                    // :remove-end:
                    let foundSubscription = subscriptions.first(named: "user-team")
                    try await subscriptions.update {
                        foundSubscription?.updateQuery(toType: FlexibleSync_Team.self, where: {
                             $0.teamName == "Documentation"
                        })
                    }
                    XCTAssertEqual(subscriptions.count, 1) // :remove:
                    return realm
                }
                // :snippet-end:
                print("Successfully opened realm: \(realm)")
            } catch {
                print("Failed to open realm: \(error.localizedDescription)")
                // handle error
            }
        } catch {
            fatalError("Login failed: \(error.localizedDescription)")
        }
    }

    func testRemoveSingleSubscription() async {
        let app = App(id: APPID)

        do {
            let credentials = emailPasswordCredentials(app: app)
            let user = try await app.login(credentials: credentials)
            var flexSyncConfig = user.flexibleSyncConfiguration()
            flexSyncConfig.objectTypes = [FlexibleSync_Task.self, FlexibleSync_Team.self]
            do {
                // :snippet-start: remove-single-subscription
                let realm = try await getRealmAfterRemovingSubscription()
                
                // Opening a realm and accessing it must be done from the same thread.
                // Marking this function as `@MainActor` avoids threading-related issues.
                @MainActor
                func getRealmAfterRemovingSubscription() async throws -> Realm {
                    let realm = try await Realm(configuration: flexSyncConfig)
                    let subscriptions = realm.subscriptions
                    // :remove-start:
                    // Add subscriptions to remove
                    try await subscriptions.update {
                        subscriptions.append(
                            QuerySubscription<FlexibleSync_Team>(name: "docs-team") {
                                $0.teamName == "Documentation"
                            })
                        subscriptions.append(
                            QuerySubscription<FlexibleSync_Team>(name: "existing-subscription") {
                                $0.teamName == "Engineering"
                            })
                    }
                    XCTAssertEqual(subscriptions.count, 2)
                    // :remove-end:
                    // Look for a specific subscription, and then remove it
                    let foundSubscription = subscriptions.first(named: "docs-team")
                    try await subscriptions.update {
                        subscriptions.remove(foundSubscription!)
                    }
                    // :remove-start:
                    XCTAssertEqual(subscriptions.count, 1)
                    // :remove-end:
                    // Or remove a subscription that you know exists without querying for it
                    try await subscriptions.update {
                        subscriptions.remove(named: "existing-subscription")
                    }
                    XCTAssertEqual(subscriptions.count, 0) // :remove:
                    return realm
                }
                // :snippet-end:
                print("Successfully opened realm: \(realm)")
            } catch {
                print("Failed to open realm: \(error.localizedDescription)")
                // handle error
            }
        } catch {
            fatalError("Login failed: \(error.localizedDescription)")
        }
    }

    func testRemoveAllSubscriptionsObjectType() async {
        let app = App(id: APPID)

        do {
            let credentials = emailPasswordCredentials(app: app)
            let user = try await app.login(credentials: credentials)
            var flexSyncConfig = user.flexibleSyncConfiguration()
            flexSyncConfig.objectTypes = [FlexibleSync_Task.self, FlexibleSync_Team.self]
            do {
                // :snippet-start: remove-subscriptions-to-object-type
                let realm = try await getRealmAfterRemovingAllSubscriptionsToAnObjectType()
                
                // Opening a realm and accessing it must be done from the same thread.
                // Marking this function as `@MainActor` avoids threading-related issues.
                @MainActor
                func getRealmAfterRemovingAllSubscriptionsToAnObjectType() async throws -> Realm {
                    let realm = try await Realm(configuration: flexSyncConfig)
                    let subscriptions = realm.subscriptions
                    // :remove-start:
                    // Add subscriptions to remove
                    try await subscriptions.update {
                        subscriptions.append(
                            QuerySubscription<FlexibleSync_Team>(name: "documentation-team") {
                                $0.teamName == "Documentation"
                            })
                        subscriptions.append(
                            QuerySubscription<FlexibleSync_Team>(name: "another-subscription") {
                                $0.teamName == "Engineering"
                            })
                    }
                    XCTAssertEqual(subscriptions.count, 2)
                    // :remove-end:
                    try await subscriptions.update {
                        subscriptions.removeAll(ofType: FlexibleSync_Team.self)
                    }
                    XCTAssertEqual(subscriptions.count, 0) // :remove:
                    return realm
                }
                // :snippet-end:
                print("Successfully opened realm: \(realm)")
            } catch {
                print("Failed to open realm: \(error.localizedDescription)")
                // handle error
            }
        } catch {
            fatalError("Login failed: \(error.localizedDescription)")
        }
    }

    func testRemoveAllSubscriptions() async {
        let app = App(id: APPID)

        do {
            let credentials = emailPasswordCredentials(app: app)
            let user = try await app.login(credentials: credentials)
            var flexSyncConfig = user.flexibleSyncConfiguration()
            flexSyncConfig.objectTypes = [FlexibleSync_Task.self, FlexibleSync_Team.self]
            do {
                // :snippet-start: remove-all-subscriptions
                let realm = try await getRealmAfterRemovingAllSubscriptions()
                
                // Opening a realm and accessing it must be done from the same thread.
                // Marking this function as `@MainActor` avoids threading-related issues.
                @MainActor
                func getRealmAfterRemovingAllSubscriptions() async throws -> Realm {
                    let realm = try await Realm(configuration: flexSyncConfig)
                    let subscriptions = realm.subscriptions
                    try await subscriptions.update {
                        subscriptions.removeAll()
                    }
                    return realm
                }
                // :snippet-end:
            } catch {
                print("Failed to open realm: \(error.localizedDescription)")
                // handle error
            }
        } catch {
            fatalError("Login failed: \(error.localizedDescription)")
        }
    }
    
    @MainActor
    func testRemoveAllUnnamedSubscriptions() async {
        let app = App(id: APPID)

        do {
            let credentials = emailPasswordCredentials(app: app)
            let user = try await app.login(credentials: credentials)
            var flexSyncConfig = user.flexibleSyncConfiguration()
            flexSyncConfig.objectTypes = [FlexibleSync_Task.self, FlexibleSync_Team.self]
            do {
                // :snippet-start: remove-all-unnamed-subscriptions
                let realm = try await Realm(configuration: flexSyncConfig)
                XCTAssertEqual(realm.subscriptions.count, 0) // :remove:
                // Add 2 subscriptions, one named and one unnamed.
                let results = try await realm.objects(FlexibleSync_Team.self).where { $0.teamName == "Developer Education" }.subscribe(name: "team_developer_education")
                let results2 = try await realm.objects(FlexibleSync_Task.self).where { $0.completed == false }.subscribe()
                XCTAssertEqual(realm.subscriptions.count, 2) // :remove:
                // Later, remove only the unnamed one
                let subscriptions = realm.subscriptions
                try await subscriptions.update {
                    subscriptions.removeAll(unnamedOnly: true)
                }
                // :snippet-end:
                // Removing unnamed subscriptions should leave us with one
                XCTAssertEqual(realm.subscriptions.count, 1)
            } catch {
                print("Failed to open realm: \(error.localizedDescription)")
                // handle error
            }
        } catch {
            fatalError("Login failed: \(error.localizedDescription)")
        }
    }

    func testOpenFlexSyncRealm() async throws {
        // :snippet-start: flex-sync-open-realm
        let realm = try await openFlexibleSyncRealm()
        
        // Opening a realm and accessing it must be done from the same thread.
        // Marking this function as `@MainActor` avoids threading-related issues.
        @MainActor
        func openFlexibleSyncRealm() async throws -> Realm {
            let app = App(id: APPID)
            let credentials = emailPasswordCredentials(app: app)
            let user = try await app.login(credentials: credentials)
            var config = user.flexibleSyncConfiguration()
            // Pass object types to the Flexible Sync configuration
            // as a temporary workaround for not being able to add complete schema
            // for a Flexible Sync app
            config.objectTypes = [FlexibleSync_Task.self, FlexibleSync_Team.self]
            let realm = try await Realm(configuration: config, downloadBeforeOpen: .always)
            print("Successfully opened realm: \(realm)")
            return realm
        }
        // :snippet-end:
        XCTAssertNotNil(realm)
        try await app.currentUser?.logOut()
    }
}
// :replace-end:
