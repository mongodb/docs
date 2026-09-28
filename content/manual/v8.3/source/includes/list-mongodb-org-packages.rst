.. Only include this file on a page containing the section title
.. "Run MongoDB Community Edition"

MongoDB Community Edition is available from its own dedicated
repository, and contains the following officially-supported packages:

.. list-table::
  :header-rows: 1
  :widths: 25 75

  * - Package Name
    - Description

  * - ``{+package-name-org+}``
    - A ``metapackage`` that automatically installs the component
      packages listed below.

  * - ``{+package-name-org+}-database``
    - A ``metapackage`` that automatically installs the component
      packages listed below.

      .. list-table::
         :header-rows: 1
         :widths: 50 50

         * - Package Name
           - Description

         * - ``{+package-name-org+}-server``
           - Contains the :binary:`~bin.mongod` daemon, associated init
             script, and a :ref:`configuration file
             <conf-file>` (``/etc/mongod.conf``). You
             can use the initialization script to start :binary:`~bin.mongod`
             with the configuration file. For details, see the "Run MongoDB
             Community Edition" section, above.

         * - ``{+package-name-org+}-mongos``
           - Contains the :binary:`~bin.mongos` daemon.

  * - ``{+package-name+}-mongosh``
    - Contains the MongoDB Shell (:binary:`~bin.mongosh`).

  * - ``{+package-name-org+}-tools``
    - A ``metapackage`` that automatically installs the component
      packages listed below:

      .. list-table::
         :header-rows: 1
         :widths: 50 50

         * - Package Name
           - Description

         * - ``mongodb-database-tools``
           - Contains the following MongoDB database tools:

             - :binary:`~bin.mongodump`
             - :binary:`~bin.mongorestore`
             - :binary:`~bin.bsondump`
             - :binary:`~bin.mongoimport`
             - :binary:`~bin.mongoexport`
             - :binary:`~bin.mongostat`
             - :binary:`~bin.mongotop`
             - :binary:`~bin.mongofiles`
             
         * - ``{+package-name-org+}-database-tools-extra``
           - Contains the :ref:`install-compass` script
