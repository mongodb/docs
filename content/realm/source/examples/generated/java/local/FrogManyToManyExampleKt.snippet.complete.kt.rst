.. code-block:: kotlin
   :emphasize-lines: 9

   import io.realm.RealmList
   import io.realm.RealmObject

   open class Frog : RealmObject {
       var name: String? = null
       var age = 0
       var species: String? = null
       var owner: String? = null
       var bestFriends: RealmList<Frog>? = null 

       constructor(
           name: String?,
           age: Int,
           species: String?,
           owner: String?,
           bestFriends: RealmList<Frog>?
       ) {
           this.name = name
           this.age = age
           this.species = species
           this.owner = owner
           this.bestFriends = bestFriends
       }

       constructor() {} // RealmObject subclasses must provide an empty constructor
   }
