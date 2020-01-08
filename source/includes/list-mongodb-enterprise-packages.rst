MongoDB Enterprise Edition is available from its own dedicated
repository, and contains the following officially-supported packages:

.. container::

   .. list-table::
     :header-rows: 1
     :widths: 25 75

     * - Package Name
       - Description

     * - ``mongodb-enterprise``
       - A ``metapackage`` that will automatically install
         the four component packages listed below.

     * - ``mongodb-enterprise-server``
       - Contains the :binary:`~bin.mongod` daemon and associated
         configuration and init scripts.

     * - ``mongodb-enterprise-mongos``
       - Contains the :binary:`~bin.mongos` daemon.

     * - ``mongodb-enterprise-shell``
       - Contains the :binary:`~bin.mongo` shell.

     * - ``mongodb-enterprise-tools``
       - Contains the following MongoDB tools: :binary:`~bin.mongoimport`
         :binary:`~bin.bsondump`, :binary:`~bin.mongodump`, :binary:`~bin.mongoexport`,
         :binary:`~bin.mongofiles`,
         :binary:`~bin.mongoperf`, :binary:`~bin.mongorestore`, :binary:`~bin.mongostat`,
         and :binary:`~bin.mongotop`.
