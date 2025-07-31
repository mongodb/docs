.. _fts-field-types-geo-egs:

Try an Example for the |fts-field-type| Type  
--------------------------------------------

.. include:: /includes/fts/field-types/try-an-example.rst

.. include:: /includes/fts/field-types/configure-and-run.rst

The following index definition for the ``sample_airbnb.listingsAndReviews`` collection
indexes the ``address.location`` field as the ``geo`` type. This index allows
you to query against that field by using the |fts| :ref:`geoShape <geoshape-ref>`
and :ref:`geoWithin <geowithin-ref>` operators. 

.. tabs:: 

   .. tab:: Visual Editor 
      :tabid: vib 

      1. In the :guilabel:`Add Field Mapping` window, select
         :guilabel:`address.location` from the :guilabel:`Field
         Name` dropdown. 
      #. Click the :guilabel:`Data Type` dropdown and select
         :guilabel:`Geo`.
      #. Modify the :guilabel:`Geo Properties` to set the value for 
         :guilabel:`Index Shapes` to ``true``.
      #. Click :guilabel:`Add`. 

   .. tab:: JSON Editor 
      :tabid: jsonib

      Replace the default index definition with the following
      definition:

      .. code-block:: json
         :copyable: true

         {
            "mappings": {
               "dynamic": false,
               "fields": {
                  "address": {
                     "type": "document",
                     "fields": {
                        "location": {
                           "type": "geo",
                           "indexShapes": true
                        }
                     }
                  }
               }
            }
         }
