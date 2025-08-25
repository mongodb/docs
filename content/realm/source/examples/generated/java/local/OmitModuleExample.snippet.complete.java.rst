.. code-block:: java
   :emphasize-lines: 3

   import io.realm.annotations.RealmModule;

   @RealmModule(classes = { Frog.class, Fly.class }) 
   public class MyModule {
   }
