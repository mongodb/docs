.. list-table::
   :widths: 20 14 11 45 10
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Necessity
     - Description
     - Default
     -

   * - since
     - number
     - Optional
     - |Epoch-time| from which to retrieve suggested indexes.
     -

   * - duration
     - number
     - Optional
     - Length of time in milliseconds during which to find
       suggested indexes among the managed namespaces in the cluster.
     -

   * - namespaces
     - string
     - Optional
     - Namespaces from which to retrieve suggested indexes. A namespace
       consists of the database and collection resource separated by a
       ``.``, such as ``<database>.<collection>``.

       To specify multiple namespaces, pass the parameter multiple
       times using an ampersand (``&``) as a delimiter, once for each
       namespace.

       .. example::

          ?namespaces=data.stocks&namespaces=data.zips&pretty=true

       Omit to return results for all namespaces.
     -

   * - nIndexes
     - number
     - Optional
     - Maximum number of indexes to suggest.
     - Unlimited

   * - nExamples
     - number
     - Optional
     - Maximum number of examples queries to provide that will be
       improved by a suggested index.
     - ``5``

.. include:: /includes/api/facts/pa-since-duration-requirements.rst
