In the :guilabel:`Aggregations` tab of the ``movies`` collection,
configure each of the following pipeline stages by selecting the stage
from the dropdown and adding the query for that stage. Click
:guilabel:`Add Stage` to add additional stages.

.. list-table::
   :header-rows: 1
   :widths: 25 75

   * - Pipeline Stage
     - Query

   * - ``$search``
     - .. code-block:: javascript
          
          {
            "wildcard": {
              "query": "Green D*",
              "path": "title"
            }
          }

   * - ``$project``
     - .. code-block:: javascript
          
          {
            "_id": 0,
            "title": 1,
          }
