.. code-block:: kotlin
   :emphasize-lines: 3

   import io.realm.annotations.RealmModule

   @RealmModule(classes = [Frog::class, Fly::class]) 
   open class MyModule
