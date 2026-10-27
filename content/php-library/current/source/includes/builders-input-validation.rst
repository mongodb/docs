.. important:: Input Validation

   The builder classes pass values to the underlying MongoDB
   operation. By design, the builders are not a security
   sanitization layer. Validate and sanitize untrusted input in your
   application before you pass it to a builder.
