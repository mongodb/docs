.. code-block:: kotlin
   :emphasize-lines: 4, 5, 18

   import io.realm.RealmModel
   import io.realm.annotations.RealmClass

   @RealmClass 
   open class Frog : RealmModel { 
       var name: String? = null
       var age = 0
       var species: String? = null
       var owner: String? = null

       constructor(name: String?, age: Int, species: String?, owner: String?) {
           this.name = name
           this.age = age
           this.species = species
           this.owner = owner
       }

       constructor() {} // RealmObject subclasses must provide an empty constructor
   }
