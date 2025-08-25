.. code-block:: java
   :emphasize-lines: 4

   import io.realm.RealmObject;
   import io.realm.annotations.RealmClass;

   @RealmClass(embedded=true) 
   public class Fly extends RealmObject {
       private String name;
       public Fly(String name) {
           this.name = name;
       }
       public Fly() {} // RealmObject subclasses must provide an empty constructor
   }
