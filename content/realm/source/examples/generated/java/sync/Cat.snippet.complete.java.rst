.. code-block:: java
   :emphasize-lines: 12, 13

   import org.bson.types.ObjectId;

   import io.realm.RealmObject;
   import io.realm.RealmResults;
   import io.realm.annotations.LinkingObjects;
   import io.realm.annotations.PrimaryKey;

   public class Cat extends RealmObject {
       @PrimaryKey
       private ObjectId _id = new ObjectId();
       private String name = null;
       @LinkingObjects("cat") 
       private final RealmResults<Human> owner = null; 
       public Cat(String name) {
           this.name = name;
       }
       public Cat() {
       }

       public ObjectId get_id() {
           return _id;
       }

       public String getName() {
           return name;
       }

       public void setName(String name) {
           this.name = name;
       }

       public RealmResults<Human> getOwner() {
           return owner;
       }
   }
