MongoDB provides officially supported packages in their own repository. This
repository contains the following packages:

.. list-table::
   :widths: 25 75

   * - ``mongodb-org``
     - A ``metapackage`` that will automatically install
       the four component packages listed below.

   * - ``mongodb-org-server``
     - Contains the :program:`mongod` daemon and associated
       configuration and init scripts.

   * - ``mongodb-org-mongos``
     - Contains the :program:`mongos` daemon.

   * - ``mongodb-org-shell``
     - Contains the :program:`mongo` shell.

   * - ``mongodb-org-tools``
     - Contains the following MongoDB tools: :program:`mongoimport`
       :program:`bsondump`, :program:`mongodump`, :program:`mongoexport`,
       :program:`mongofiles`, :program:`mongooplog`,
       :program:`mongoperf`, :program:`mongorestore`, :program:`mongostat`,
       and :program:`mongotop`.
