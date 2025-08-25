.. code-block:: java
   :emphasize-lines: 5

   import io.realm.RealmList;
   import io.realm.RealmObject;

   public class Toad extends RealmObject {
       private RealmList<Frog> frogFriends; 
       public Toad(RealmList<Frog> frogFriends) {
           this.frogFriends = frogFriends;
       }
       public Toad() {}

       public RealmList<Frog> getFrogFriends() { return frogFriends; }
       public void setFrogFriends(RealmList<Frog> frogFriends) { this.frogFriends = frogFriends; }
   }
