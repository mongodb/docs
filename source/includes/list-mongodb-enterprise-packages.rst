MongoDB Enterprise Edition is available from its own dedicated
repository, and contains the following officially-supported packages:

.. container::

   .. list-table::
     :header-rows: 1
     :widths: 35 65

     * - Package Name
       - Description

     * - ``{+package-name-enterprise+}``
       - A ``metapackage`` that automatically installs the component
         packages listed below.

     * - ``{+package-name-enterprise+}-server``
       - Contains the :binary:`~bin.mongod` daemon and associated
         configuration and init scripts.

     * - ``{+package-name-enterprise+}-mongos``
       - Contains the :binary:`~bin.mongos` daemon.

     * - ``{+package-name-enterprise+}-shell``
       - Contains the :binary:`~bin.mongo` shell.

     * - ``{+package-name-enterprise+}-cryptd``
       - Contains the :ref:`mongocryptd <csfle-encryption-components>`
         binary

     * - ``{+package-name-enterprise+}-tools``
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

            * - ``{+package-name-enterprise+}-database-tools-extra``
              - Contains the following MongoDB support tools:

                - :binary:`~bin.mongoldap`
                - ``mongokerberos``
                - :ref:`install-compass` script
                - ``mongodecrypt`` binary

