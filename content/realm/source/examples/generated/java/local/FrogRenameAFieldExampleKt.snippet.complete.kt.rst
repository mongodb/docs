.. code-block:: kotlin
   :emphasize-lines: 7

   import io.realm.RealmObject
   import io.realm.annotations.RealmField

   open class Frog : RealmObject {
       var name: String? = null
       var age = 0
       @RealmField("latinName") var species: String? = null 
       var owner: String? = null

       constructor(name: String?, age: Int, species: String?, owner: String?) {
           this.name = name
           this.age = age
           this.species = species
           this.owner = owner
       }

       constructor() {} // RealmObject subclasses must provide an empty constructor
   }
