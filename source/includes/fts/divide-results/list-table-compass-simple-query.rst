.. list-table:: 
   :header-rows: 1

   * - Stage
     - Query

   * - ``$search``
     - .. code-block:: json
          :copyable: true
     
          {
            index: "pagination-tutorial",
            text: {
              query: "tom hanks",
              path: "cast"
            },
          }

   * - ``$project``
     - .. code-block:: json
          :copyable: true

          {
            _id: 0,
            title: 1,
            cast: 1
          }

   * - ``$skip``
     - .. code-block:: json
          :copyable: true

          10

   * - ``$limit``
     - .. code-block:: json
          :copyable: true

          10
