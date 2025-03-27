In the :guilabel:`Aggregations` tab of the ``movies`` collection,
configure the following pipeline stages by selecting the stage
from the dropdown and adding the query for that stage.

.. list-table::
   :header-rows: 1
   :widths: 25 75

   * - Pipeline Stage
     - Query

   * - ``$searchMeta``
     - .. code-block:: javascript

          {
            facet: {
              operator: {
                autocomplete: {
                    path: 'title',
                    query: 'Gravity'
                }
              },
              facets: {
                titleFacet: {
                  type: 'string',
                  path: 'title'
                }
              }
            }
          }
