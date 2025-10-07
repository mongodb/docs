Try an Example for the |fts-field-type| Type  
--------------------------------------------

.. include:: /includes/fts/field-types/try-an-example.rst

.. include:: /includes/fts/field-types/configure-and-run.rst

.. collapsible::
   :heading: Index Dynamically Using Default typeSet
   :sub_heading: Enables dynamic mappings to index all dynamically indexable field types.
   :expanded:

   The following index definition for the ``sample_mflix.movies`` collection
   indexes the ``awards`` field as the ``document`` type. It also configures
   |fts| to automatically index all the dynamically indexable fields inside the
   ``awards`` object.

   .. tabs:: 

      .. tab:: Visual Editor 
         :tabid: vib 

         1. In the :guilabel:`Add Field Mapping` window, select
            :guilabel:`awards` from the :guilabel:`Field Name`
            dropdown. 
         #. Click the :guilabel:`Data Type` dropdown and select
            :guilabel:`Document`.
         #. Modify the :guilabel:`Document Properties` to set the value for
            :guilabel:`Dynamic` to ``true``.
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
                     "awards": {
                        "type": "document",
                        "dynamic": true
                     }
                  }
               }
            }

.. collapsible::
   :heading: Index Dynamically Using Configured typeSet
   :sub_heading: Configures field types to dynamically index.
   :expanded:

   The following index definition for the ``sample_mflix.movies`` collection
   indexes the ``awards`` field as the ``document`` type. It references
   the ``typeSet`` name, ``onlyNumbers``. The field type definition
   named ``onlyNumbers`` enables automatic indexing for only fields of
   type ``number`` in the ``awards`` document.

   .. tabs:: 

      .. tab:: Visual Editor 
         :tabid: vib 

         You can't configure ``typeSets`` for dynamic mappings using the
         {+atlas-ui+} :guilabel:`Visual Editor`. 

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
                     "awards": {
                        "type": "document",
                        "dynamic": {
                          "typeSet": "onlyNumbers"
                        }
                     }
                  }
               },
               "typeSets": [
                  {
                    "name": "onlyNumbers",
                    "types": [
                      {
                        "type": "number"
                      }
                    ]
                  }
               ]
            }
