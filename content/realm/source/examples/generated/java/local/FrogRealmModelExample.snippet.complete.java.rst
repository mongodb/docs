.. code-block:: java
   :emphasize-lines: 4, 5, 16

   import io.realm.RealmModel;
   import io.realm.annotations.RealmClass;

   @RealmClass 
   public class Frog implements RealmModel { 
       private String name;
       private int age;
       private String species;
       private String owner;
       public Frog(String name, int age, String species, String owner) {
           this.name = name;
           this.age = age;
           this.species = species;
           this.owner = owner;
       }
       public Frog() {} // RealmObject subclasses must provide an empty constructor

       public String getName() { return name; }
       public void setName(String name) { this.name = name; }
       public int getAge() { return age; }
       public void setAge(int age) { this.age = age; }
       public String getSpecies() { return species; }
       public void setSpecies(String species) { this.species = species; }
       public String getOwner() { return owner; }
       public void setOwner(String owner) { this.owner = owner; }
   }
