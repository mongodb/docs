MongoDB provides officially supported packages in their own repository. This
repository contains the following packages:

.. list-table::
   :widths: 25 75

   * - ``mongodb-org``
     - A ``metapackage`` that will automatically install
       the four component packages listed below.

   * - ``mongodb-org-server``
     - Contains the :binary:`~bin.mongod` daemon and associated
       configuration and init scripts.

   * - ``mongodb-org-mongos``
     - Contains the :binary:`~bin.mongos` daemon.

   * - ``mongodb-org-shell``
     - Contains the :binary:`~bin.mongo` shell.

   * - ``mongodb-org-tools``
     - Contains the following MongoDB tools: :binary:`~bin.mongoimport`
       :binary:`~bin.bsondump`, :binary:`~bin.mongodump`, :binary:`~bin.mongoexport`,
       :binary:`~bin.mongofiles`, :binary:`~bin.mongooplog`,
       :binary:`~bin.mongoperf`, :binary:`~bin.mongorestore`, :binary:`~bin.mongostat`,
       and :binary:`~bin.mongotop`.
