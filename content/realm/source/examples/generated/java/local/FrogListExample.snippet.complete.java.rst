.. code-block:: java
   :emphasize-lines: 9

   import io.realm.RealmList;
   import io.realm.RealmObject;

   public class Frog extends RealmObject {
       private String name;
       private int age;
       private String species;
       private String owner;
       private RealmList<String> favoriteColors; 
       public Frog(String name, int age, String species, String owner, RealmList<String> favoriteColors) {
           this.name = name;
           this.age = age;
           this.species = species;
           this.owner = owner;
           this.favoriteColors = favoriteColors;
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
       public RealmList<String> getFavoriteColors() { return favoriteColors; }
       public void setFavoriteColors(RealmList<String> favoriteColors) { this.favoriteColors = favoriteColors; }
   }
