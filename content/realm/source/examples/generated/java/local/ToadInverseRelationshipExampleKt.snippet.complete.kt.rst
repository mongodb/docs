.. code-block:: kotlin
   :emphasize-lines: 5

   import io.realm.RealmList
   import io.realm.RealmObject

   open class Toad : RealmObject {
       var frogFriends: RealmList<Frog>? = null 

       constructor(frogFriends: RealmList<Frog>?) {
           this.frogFriends = frogFriends
       }

       constructor() {}
   }
