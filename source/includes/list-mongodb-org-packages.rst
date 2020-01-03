.. Only include this file on a page containing the section title
.. "Run MongoDB Community Edition"

MongoDB Community Edition is available from its own dedicated
repository, and contains the following officially-supported packages:

.. container::

   .. list-table::
     :header-rows: 1
     :widths: 25 75

     * - Package Name
       - Description

     * - ``{+package-name-org+}``
       - A ``metapackage`` that will automatically install
         the four component packages listed below.

     * - ``{+package-name-org+}-server``

       - Contains the :binary:`~bin.mongod` daemon, associated init
         script, and a :ref:`configuration file
         <conf-file>` (``/etc/mongod.conf``). You
         can use the initialization script to start :binary:`~bin.mongod`
         with the configuration file. For details, see `Run MongoDB
         Community Edition`_.

     * - ``{+package-name-org+}-mongos``
       - Contains the :binary:`~bin.mongos` daemon.

     * - ``{+package-name-org+}-shell``
       - Contains the :binary:`~bin.mongo` shell.

     * - ``{+package-name-org+}-tools``
       - Contains the following MongoDB tools: :binary:`~bin.mongoimport`
         :binary:`~bin.bsondump`, :binary:`~bin.mongodump`, :binary:`~bin.mongoexport`,
         :binary:`~bin.mongofiles`,
         :binary:`~bin.mongorestore`, :binary:`~bin.mongostat`,
         and :binary:`~bin.mongotop`.
