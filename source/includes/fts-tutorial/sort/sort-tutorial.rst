.. list-table::
   :header-rows: 1
   :widths: 25 75

   * - Pipeline Stage
     - Query

   * - ``$search``
     - .. code-block:: javascript

          {
            wildcard: {
              path: 'title',
              query: "Happy*"
            },
            returnStoredSource: true
          }

   * - ``$limit``
     - .. code-block:: javascript

          5

   * - ``$sort``
     - .. code-block:: javascript

          {
            title: -1
          }
