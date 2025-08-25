.. code-block:: swift
   :emphasize-lines: 3

   class Dog: Object {
       @Persisted var name = ""
       @Persisted var siblings: List<Dog> 
       @Persisted var age: Int?
   }
