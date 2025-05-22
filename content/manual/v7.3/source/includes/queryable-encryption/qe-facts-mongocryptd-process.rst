The ``mongocryptd`` process:

- Uses the specified automatic encryption rules to mark fields in 
  read and write operations for encryption.

- Prevents unsupported operations from executing on encrypted 
  fields.

- Parses the encryption schema specified for the database connection.
  Automatic encryption rules use a strict subset of JSON schema syntax.
  If the rules contain invalid automatic encryption syntax or any
  :query:`document validation <$jsonSchema>` syntax, ``mongocryptd``
  returns an error. 

``mongocryptd`` only performs the previous functions, and doesn't
perform any of the following:

- ``mongocryptd`` doesn't perform encryption or decryption
- ``mongocryptd`` doesn't access any encryption key material
- ``mongocryptd`` doesn't listen over the network

To perform field encryption and automatic decryption, the drivers use 
the Apache-licensed `libmongocrypt
<https://github.com/mongodb/libmongocrypt>`__ 
library.