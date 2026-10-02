MongoDB Enterprise Edition is available from its own dedicated
repository, and contains the following officially-supported packages:

.. list-table::
  :header-rows: 1
  :widths: 35 65

  * - Package Name
    - Description

  * - ``{+package-name-enterprise+}``
    - A ``metapackage`` that automatically installs the component
      packages listed below.

  * - ``{+package-name-enterprise+}-database``
    - A ``metapackage`` that automatically installs the component
      packages listed below:

      - ``{+package-name-enterprise+}-server``: contains the
        :binary:`~bin.mongod` daemon and associated configuration and
        init scripts.
      - ``{+package-name-enterprise+}-mongos``: contains the
        :binary:`~bin.mongos` daemon.
      - ``{+package-name-enterprise+}-cryptd``: contains the
        :ref:`mongocryptd <csfle-encryption-components>` binary.

  * - ``{+package-name+}-mongosh``
    - Contains the MongoDB Shell (:binary:`~bin.mongosh`).

  * - ``{+package-name+}-shared-openssl*``
    - Contains the MongoDB Shell that uses the OpenSSL version already
      installed on your computer (:binary:`~bin.mongosh`).

  * - ``{+package-name-enterprise+}-tools``
    - A ``metapackage`` that automatically installs the component
      packages listed below:

      - ``mongodb-database-tools``: contains the following MongoDB
        database tools:

        - :binary:`~bin.mongodump`
        - :binary:`~bin.mongorestore`
        - :binary:`~bin.bsondump`
        - :binary:`~bin.mongoimport`
        - :binary:`~bin.mongoexport`
        - :binary:`~bin.mongostat`
        - :binary:`~bin.mongotop`
        - :binary:`~bin.mongofiles`

      - ``{+package-name-enterprise+}-database-tools-extra``: contains
        the following MongoDB support tools:

        - :binary:`~bin.mongoldap`
        - :binary:`~bin.mongokerberos`
        - :ref:`install-compass` script
        - ``mongodecrypt`` binary
