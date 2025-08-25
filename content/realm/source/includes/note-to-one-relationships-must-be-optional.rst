.. important:: To-one relationships must be optional

   When you declare a to-one relationship in your object model, it must
   be an optional property. If you try to make a to-one relationship
   required, Realm throws an exception at runtime.