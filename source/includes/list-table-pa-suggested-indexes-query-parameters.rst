.. list-table::
   :header-rows: 1
   :widths: 25 15 75

   * - Path Element
     - Type
     - Description

   * - ``since``
     - long
     - Point in time from which to retrieve suggested indexes,
       stated in `milliseconds since epoch
       <https://currentmillis.com/>`_. 

   * - ``duration``
     - long
     - Length of time in milliseconds during which to find
       suggested indexes among the managed namespaces in the cluster.

   * - ``namespaces``
     - string
     - Namespaces from which to retrieve suggested indexes. A namespace
       consists of the database and collection resource separated by a
       ``.``, such as ``<database>.<collection>``.

       To specify multiple namespaces, pass the parameter multiple times
       using an ampersand (``&``) as a delimiter, once for each
       namespace.

       .. example::

          ?namespaces=data.stocks&namespaces=data.zips&pretty=true

       Omit to return results for all namespaces.


   * - ``nIndexes``
     - long
     - Maximum number of indexes to suggest. Defaults to unlimited.

   * - ``nExamples``
     - long
     - Maximum number of examples queries to provide that will be
       improved by a suggested index. Defaults to ``5``.

   * - ``pretty``
     - boolean
     - Display response in a `prettyprint <https://en.wikipedia.org/wiki/Prettyprint?oldid=791126873>`_
       format. Defaults to ``false``.

   * - ``envelope``
     - boolean
     - Specifies whether or not to wrap the response in an
       :ref:`envelope <api-envelope>`. Defaults to ``false``.

.. note::

   If ``since`` is indicated and ``duration`` is omitted,
   the response contains results from the ``since`` point
   up to the present time.

   If ``duration`` is indicated and
   ``since`` is omitted, the response contains results from
   ``duration`` ms ago through the present time.

   If both ``since`` and ``duration`` are omitted, the response
   contains results from the previous 24 hours up
   through the present time.
