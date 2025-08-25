.. code-block:: java
   :emphasize-lines: 5

   import io.realm.RealmObject;
   import io.realm.annotations.PrimaryKey;

   public class Frog extends RealmObject {
       @PrimaryKey private String name; 
       private int age;
       private String species;
       private String owner;
       public Frog(String name, int age, String species, String owner) {
           this.name = name;
           this.age = age;
           this.species = species;
           this.owner = owner;
       }
       public Frog(){} // RealmObject subclasses must provide an empty constructor

       public String getName() { return name; }
       public void setName(String name) { this.name = name; }
       public int getAge() { return age; }
       public void setAge(int age) { this.age = age; }
       public String getSpecies() { return species; }
       public void setSpecies(String species) { this.species = species; }
       public String getOwner() { return owner; }
       public void setOwner(String owner) { this.owner = owner; }
   }
