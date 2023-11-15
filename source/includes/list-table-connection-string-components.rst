Connection String Components
````````````````````````````

A connection string includes the following components:

.. list-table::
   :widths: 20 80
   :header-rows: 1

   * - Component
     - Description

   * - ``mongodb://`` or ``mongodb+srv://``

     - A required prefix to identify that this is a string in the
       standard connection format (``mongodb://``) or SRV connection
       format (``mongodb+srv://``). To learn more about each format,
       see :ref:`connections-standard-connection-string-format`
       and :ref:`connections-dns-seedlist`.

   * - ``username:password@``

     - Optional. Authentication credentials. 
     
       If specified, the client will attempt to authenticate the
       user to the :urioption:`authSource`. If
       :urioption:`authSource` is unspecified, the client will
       attempt to authenticate the user to the ``defaultauthdb``.
       And if the ``defaultauthdb`` is unspecified, to the ``admin``
       database.

       .. include:: /includes/fact-pct-encode-uri.rst

       See also :urioption:`authSource`.

   * - ``host[:port]``

     - The host (and optional port number) where the
       :binary:`~bin.mongod` instance (or :binary:`~bin.mongos`
       instance for a sharded cluster) is running. You can specify a
       hostname, IP address, or UNIX domain socket. Specify as many
       hosts as appropriate for your deployment topology:

       - For a standalone, specify the hostname of the standalone
         :binary:`~bin.mongod` instance.

       - .. include:: /includes/fact-uri-rs-hostnames.rst

       - For a sharded cluster, specify the hostname(s) of the
         :binary:`~bin.mongos` instance(s).

       If the port number is not specified, the default port ``27017``
       is used.

       .. note:: 
          
          If you use the SRV URI connection format, you can specify only one 
          host and no port. Otherwise, the driver or 
          :binary:`~bin.mongo` shell returns a parse error and does not 
          perform DNS resolution.

   * - ``/defaultauthdb``
     
     - Optional. The authentication database to use if the
       connection string includes ``username:password@``
       authentication credentials but the :urioption:`authSource` option
       is unspecified.

       If both :urioption:`authSource` and ``defaultauthdb`` are
       unspecified, the client will attempt to authenticate the
       specified user to the ``admin`` database.

   * - ``?<options>``

     - Optional. A query string that specifies connection specific
       options as ``<name>=<value>`` pairs. See
       :ref:`connections-connection-options` for a full description of
       these options.

       If the connection string does not specify a database/ you must
       specify a slash (``/``) between the last ``host`` and the
       question mark (``?``) that begins the string of options.
