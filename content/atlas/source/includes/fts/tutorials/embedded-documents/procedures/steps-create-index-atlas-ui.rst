Create the |fts| Index   
~~~~~~~~~~~~~~~~~~~~~~

Choose your preferred configuration method in the {+atlas-ui+} and then
select the database and collection.

.. |search-type| replace:: :guilabel:`Atlas Search`
.. |index-name| replace:: ``embedded-documents-tutorial``
.. |database-name| replace:: ``local_school_district`` database
.. |collection-name| replace:: ``schools`` collection

.. procedure:: 
   :style: normal

   .. include:: /includes/nav/steps-db-deployments-page.rst

   .. include:: /includes/nav/steps-atlas-search.rst

   .. include:: /includes/nav/steps-configure-index.rst

   .. step:: Specify an index configuration that indexes embedded documents.

      To learn more about the index definition, see
      :ref:`embedded-documents-tutorial-index`. 

      .. tabs:: 

         .. tab:: Visual Editor 
            :tabid: vib

            a. Click :guilabel:`Refine Your Index`.
            #. Click :guilabel:`Add Field` in the :guilabel:`Field Mappings`
               section and add the following fields in the
               :guilabel:`Customized Configuration` tab by clicking
               :guilabel:`Add` after configuring the settings for each
               field, one at a time, in the :guilabel:`Add Field Mapping` 
               window. 

               .. list-table:: 
                  :header-rows: 1 
                  :widths: 40 40 20

                  * - :guilabel:`Field Name`
                    - :guilabel:`Data Type`
                    - :guilabel:`Enable Dynamic Mapping`

                  * - ``teachers``
                    - :guilabel:`EmbeddedDocuments`
                    - On

                  * - ``teachers.classes``
                    - :guilabel:`EmbeddedDocuments`
                    - On
                    
                  * - ``teachers``
                    - :guilabel:`Document`
                    - On
                    
                  * - ``teachers.classes``
                    - :guilabel:`Document`
                    - On
                    
                  * - ``teachers.classes.grade``
                    - :guilabel:`Token` 
                    - N/A

                  * - ``clubs.sports``
                    - :guilabel:`EmbeddedDocuments`
                    - On

            #. Click :guilabel:`Add Field Mappings` to open the
               :guilabel:`Add Field Mapping` window.
            #. Select the following from the dropdown.
            #. Click :guilabel:`Add Field Mappings` to open the
               :guilabel:`Add Field Mapping` window.
            #. Select the following from the dropdown. 
            #. Toggle to enable :guilabel:`Enable Dynamic Mapping` if it
               isn't already enabled and click :guilabel:`Add`
            #. Click :guilabel:`Save`.
            #. Click :guilabel:`Save Changes`.

         .. tab:: JSON Editor 
            :tabid: jsonib

            a. Replace the default index definition with the following 
               index definition.

               .. code-block:: json 
                  :linenos: 

                  {
                    "mappings": {
                      "dynamic": true,
                      "fields": {
                        "clubs": {
                          "dynamic": true,
                          "fields": {
                            "sports": {
                              "dynamic": true,
                              "type": "embeddedDocuments"
                            }
                          },
                          "type": "document"
                        },
                        "teachers": [
                          {
                            "dynamic": true,
                            "fields": {
                              "classes": {
                                "dynamic": true,
                                "type": "embeddedDocuments"
                              }
                            },
                            "type": "embeddedDocuments"
                          },
                          {
                            "dynamic": true,
                            "fields": {
                              "classes": {
                                "dynamic": true,
                                "fields": {
                                  "grade": {
                                    "type": "token"
                                  }
                                },
                                "type": "document"
                              }
                            },
                            "type": "document"
                          }
                        ]
                      }
                    }
                  }

            #. Click :guilabel:`Next`.
            
   .. include:: /includes/fts/search-index-management/procedures/steps-fts-finish-index-creation.rst 
