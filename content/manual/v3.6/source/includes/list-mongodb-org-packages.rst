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
         :binary:`~bin.mongofiles`,
         :binary:`~bin.mongoperf`, :binary:`~bin.mongorestore`, :binary:`~bin.mongostat`,
         and :binary:`~bin.mongotop`.

The ``mongodb-org-server`` package provides an initialization script
that starts :binary:`~bin.mongod` with the ``/etc/mongod.conf``
configuration file.

.. Links to the section in the including page having this title.

See `Run MongoDB Community Edition`_ for details on using this
initialization script.
