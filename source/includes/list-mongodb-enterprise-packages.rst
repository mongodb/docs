MongoDB provides officially supported Enterprise packages in their own
repository. This repository contains the following packages:

.. list-table::
   :header-rows: 1
   :widths: 25 75

   * - Package Name
     - Description

   * - ``mongodb-enterprise``
     - A ``metapackage`` that will automatically install
       the four component packages listed below.

   * - ``mongodb-enterprise-server``
     - Contains the :program:`mongod` daemon and associated
       configuration and init scripts.

   * - ``mongodb-enterprise-mongos``
     - Contains the :program:`mongos` daemon.

   * - ``mongodb-enterprise-shell``
     - Contains the :program:`mongo` shell.

   * - ``mongodb-enterprise-tools``
     - Contains the following MongoDB tools: :program:`mongoimport`
       :program:`bsondump`, :program:`mongodump`, :program:`mongoexport`,
       :program:`mongofiles`,
       :program:`mongoperf`, :program:`mongorestore`, :program:`mongostat`,
       and :program:`mongotop`.
