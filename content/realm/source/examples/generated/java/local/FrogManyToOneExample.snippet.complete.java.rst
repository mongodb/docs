.. code-block:: java
   :emphasize-lines: 8

   import io.realm.RealmObject;

   public class Frog extends RealmObject {
       private String name;
       private int age;
       private String species;
       private String owner;
       private Frog bestFriend; 
       public Frog(String name, int age, String species, String owner, Frog bestFriend) {
           this.name = name;
           this.age = age;
           this.species = species;
           this.owner = owner;
           this.bestFriend = bestFriend;
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
       public Frog getBestFriend() { return bestFriend; }
       public void setBestFriend(Frog bestFriend) { this.bestFriend = bestFriend; }
   }
