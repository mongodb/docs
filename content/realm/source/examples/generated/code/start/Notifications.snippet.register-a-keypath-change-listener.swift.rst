.. code-block:: swift
   :emphasize-lines: 24

   // Define the dog class.
   class Dog: Object {
       @Persisted var name = ""
       @Persisted var favoriteToy = ""
       @Persisted var age: Int?
   }

   var objectNotificationToken: NotificationToken?

   func objectNotificationExample() {
       let dog = Dog()
       dog.name = "Max"
       dog.favoriteToy = "Ball"
       dog.age = 2

       // Open the default realm.
       let realm = try! Realm()
       try! realm.write {
           realm.add(dog)
       }
       // Observe notifications on some of the object's key paths. Keep a strong
       // reference to the notification token or the observation will stop.
       // Invalidate the token when done observing.
       objectNotificationToken = dog.observe(keyPaths: ["favoriteToy", "age"], { change in 
           switch change {
           case .change(let object, let properties):
               for property in properties {
                   print("Property '\(property.name)' of object \(object) changed to '\(property.newValue!)'")
               }
           case .error(let error):
               print("An error occurred: \(error)")
           case .deleted:
               print("The object was deleted.")
           }
       })

       // Now update to trigger the notification
       try! realm.write {
           dog.favoriteToy = "Frisbee"
       }
       // When you specify one or more key paths, changes to other properties
       // do not trigger notifications. In this example, changing the "name"
       // property does not trigger a notification.
       try! realm.write {
           dog.name = "Maxamillion"
       }
   }
