.. code-block:: kotlin
   :emphasize-lines: 9

   import io.realm.RealmObject
   import io.realm.annotations.Ignore

   open class Frog : RealmObject {
       var name: String? = null
       var age = 0
       var species: String? = null
       // can you ever really own a frog persistently?
       @Ignore var owner  : String? = null 

       constructor(name: String?, age: Int, species: String?, owner: String?) {
           this.name = name
           this.age = age
           this.species = species
           this.owner = owner
       }

       constructor() {} // RealmObject subclasses must provide an empty constructor
   }
