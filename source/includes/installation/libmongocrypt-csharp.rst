If you are using driver version C#/.NET 3.0 or later, perform the following 
steps:

- Install the `MongoDB.Driver.Encryption <https://www.nuget.org/packages/MongoDB.Driver.Encryption>`_
  package from NuGet. 
- If your application runs on Linux, install `libmongocrypt <https://www.mongodb.com/docs/manual/core/queryable-encryption/reference/libmongocrypt/>`_
  manually. Then, set the ``LIBMONGOCRYPT_PATH`` environment variable to 
  the absolute path to the ``libmongocrypt`` file. 