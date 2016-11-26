.. Only include this file on a page containing the section title
.. "Run MongoDB Community Edition"

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

The ``mongodb-org-server`` package provides an initialization script
that starts :program:`mongod` with the ``/etc/mongod.conf``
configuration file.

.. Links to the section in the including page having this title.

See `Run MongoDB Community Edition`_ for details on using this
initialization script.
