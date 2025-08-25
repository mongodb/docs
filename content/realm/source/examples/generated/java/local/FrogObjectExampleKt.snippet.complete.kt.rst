.. code-block:: kotlin
   :emphasize-lines: 3, 4, 10

   import io.realm.RealmObject

   // providing default values for each constructor parameter
   // fulfills the need for an empty constructor
   open class Frog(
       var name: String? = null,
       var age: Int = 0,
       var species: String? = null,
       var owner: String? = null
   ) : RealmObject() // To add an object to your Realm Schema, extend RealmObject
