.. list-table::
    :header-rows: 1
    :widths: 30 70

    * - Dependency Name
      - Description

    * - x64 Support
      - {+csfle-abbrev+} requires x64 support.
    
    * - `MongoDB.Driver.Encryption <https://www.nuget.org/packages/MongoDB.Driver.Encryption>`__
      - Required when using C#/.NET driver version 3.0 or later. This NuGet package
        is needed to enable automatic encryption.

        The `libmongocrypt library <https://www.mongodb.com/docs/manual/core/csfle/reference/libmongocrypt/>`_ 
        contains bindings to communicate with the native library that manages the
        encryption. If your application uses driver version 3.0 or later and runs
        on linux, install the library manually. Then, set the ``LIBMONGOCRYPT_PATH``
        environment variable to the absolute path to the ``libmongocrypt`` file. 

