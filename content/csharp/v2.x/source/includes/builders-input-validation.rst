.. important:: Input Validation

   Builder classes and LINQ queries pass values to the
   underlying MongoDB operation. By design, these APIs are not a
   security sanitization layer. Validate and sanitize untrusted
   input in your application before you pass it to a builder or a
   LINQ query.
