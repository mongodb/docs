.. code-block:: kotlin
   :emphasize-lines: 10, 11

   import io.realm.RealmObject
   import io.realm.RealmResults
   import io.realm.annotations.LinkingObjects

   open class Frog : RealmObject {
       var name: String? = null
       var age = 0
       var species: String? = null
       var owner: String? = null
       @LinkingObjects("frogFriends") 
       private val toadFriends: RealmResults<Toad>? = null 

       constructor(name: String?, age: Int, species: String?, owner: String?) {
           this.name = name
           this.age = age
           this.species = species
           this.owner = owner
       }

       constructor() {} // RealmObject subclasses must provide an empty constructor
   }
