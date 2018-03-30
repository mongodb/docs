Connect to your server with the :binary:`~bin.mongo` shell to test
your SSL connection. Your :binary:`~bin.mongo` command needs the
following SSL options:

.. list-table::
   :header-rows: 1
   :widths: 25 75

   * - Option
     - Value

   * - :manual:`--ssl </reference/program/mongo/#cmdoption-mongo-ssl>`
     - none

   * - :manual:`--sslCAFile </reference/program/mongo/#cmdoption-mongo-sslCAFile>`
     - ``C:\<path-to-file>\mdbca.crt`` (file generated in step 2.4)

   * - :manual:`--sslPEMKeyFile </reference/program/mongo/#cmdoption-mongo-sslPEMKeyFile>`
     - ``C:\<path-to-file>\mdb.pem`` (file generated in step 5)

