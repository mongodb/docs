To run this query in |compass|:

a. Click the :guilabel:`Aggregations` tab.
#. Click :guilabel:`Select...`, then configure the following 
   pipeline stage by selecting the stage from the dropdown and adding
   the query for that stage.

   .. list-table::
      :header-rows: 1
      :widths: 25 75

      * - Pipeline Stage
        - Query

      * - ``$searchMeta``
        - .. code-block:: javascript

             {
               "facet": {
                 "operator": {
                   "geoWithin": {
                     "path": "address.location",
                     "box": {
                       "bottomLeft": {
                         "type": "Point",
                         "coordinates": [112.467, -55.050]
                       },
                       "topRight": {
                         "type": "Point",
                         "coordinates": [168.000, -9.133]
                       }
                     }
                   }
                 },
                 "facets": {
                   "propertyTypeFacet": {
                     "type": "string",
                     "path": "property_type"
                   }
                 }
               }
             }
