.. code-block:: kotlin
   :emphasize-lines: 4

   import io.realm.RealmObject
   import io.realm.annotations.RealmClass

   @RealmClass(name = "Short_Bodied_Tailless_Amphibian") 
   open class Frog : RealmObject {
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
