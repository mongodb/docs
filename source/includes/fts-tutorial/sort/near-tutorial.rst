.. list-table::
   :header-rows: 1
   :widths: 25 75

   * - Pipeline Stage
     - Query

   * - ``$search``
     - .. code-block:: javascript

          {
            near: {
              path: 'year',
              origin: 2015,
              pivot: 5
            }
          }

   * - ``$limit``
     - .. code-block:: javascript

          5

   * - ``$project``
     - .. code-block:: javascript

          {
            title: 1,
            released: 1,
            year: 1
          }
