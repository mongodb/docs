.. code-block:: kotlin
   :emphasize-lines: 8

   import io.realm.RealmObject

   open class Frog : RealmObject {
       var name: String? = null
       var age = 0
       var species: String? = null
       var owner: String? = null
       var lastMeal: Fly? = null 

       constructor(
           name: String?,
           age: Int,
           species: String?,
           owner: String?,
           lastMeal: Fly?
       ) {
           this.name = name
           this.age = age
           this.species = species
           this.owner = owner
           this.lastMeal = lastMeal
       }

       constructor() {} // RealmObject subclasses must provide an empty constructor
   }
