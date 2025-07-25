.. list-table::
   :widths: 20 14 11 45 10
   :stub-columns: 1


   * - since
     - number
     - Optional
     - |Epoch-time| from which to retrieve slow queries.
     -

   * - duration
     - number
     - Optional
     - Length of time in milliseconds during which to find
       slow queries among the managed namespaces in the cluster.
     -

   * - namespaces
     - string
     - Optional
     - Namespaces from which to retrieve slow queries. A namespace
       consists of the database and collection resource separated by a
       ``.``, such as ``<database>.<collection>``.

       To specify multiple namespaces, pass the parameter multiple
       times using an ampersand (``&``) as a delimiter, once for each
       namespace.

       .. example::

          ?namespaces=data.stocks&namespaces=data.zips&pretty=true

       Omit to return results for all namespaces.
     -
   * - ``nLogs``
     - number
     - Optional
     - Maximum number of log lines to return.
     - ``20000``

.. include:: /includes/api/facts/pa-since-duration-requirements.rst
