.. code-block:: kotlin
   :emphasize-lines: 4

   import io.realm.RealmObject
   import io.realm.annotations.RealmClass

   @RealmClass(embedded = true) 
   open class Fly : RealmObject {
       private var name: String? = null

       constructor(name: String?) {
           this.name = name
       }

       constructor() {} // RealmObject subclasses must provide an empty constructor
   }
