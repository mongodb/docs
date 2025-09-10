.. procedure:: 
   :style: normal

   .. include:: /includes/nav/steps-db-deployments-page.rst

   .. include:: /includes/nav/steps-atlas-search.rst

   .. include:: /includes/nav/steps-configure-index.rst

   .. step:: Define an index on the fields in the materialized view.

      You can create one of the following indexes:
  
      - Index that uses dynamic mappings for running queries using the 
        :ref:`queryString <querystring-ref>` operator. You can't run queries using 
        the :ref:`autocomplete <autocomplete-ref>` operator if your index definition 
        uses only dynamic mappings.
      - Index that uses static mappings for running queries using 
        :ref:`autocomplete <autocomplete-ref>` operator. You can't run queries using 
        the :ref:`queryString <querystring-ref>` operator against fields indexed as 
        type ``autocomplete``.

      .. tabs:: 

         .. tab:: Dynamic Mappings
            :tabid: dynamic

            You can use the :guilabel:`Visual Editor` or the 
            :guilabel:`JSON Editor` in the |service| user interface to 
            create the index. 

            .. tabs:: 
  
               .. tab:: Visual Editor
                  :tabid: vib
  
                  Click :guilabel:`Create Search Index`.

               .. tab:: JSON Editor 
                  :tabid: jsoneditor

                  a. Review the index definition. 
          
                     Your index definition should look similar to the 
                     following: 

                     .. code-block:: json 

                        {
                          "mappings": {
                            "dynamic": true
                          }
                        }

                  #. Click :guilabel:`Next`.
                  #. Click :guilabel:`Create Search Index`.

         .. tab:: Static Mappings
            :tabid: static

            You can use the :guilabel:`Visual Editor` or the 
            :guilabel:`JSON Editor` in the |service| user interface 
            to create the index. 

            .. tabs:: 
  
               .. tab:: Visual Editor
                  :tabid: vib
  
                  a. Click :guilabel:`Refine Your Index`.
                  #. Click :guilabel:`Add Field` in the :guilabel:`Field
                     Mappings` section.
                  #. Click :guilabel:`Customized Configuration` in
                     the :guilabel:`Add Field Mapping` window.
                  #. Select :guilabel:`accommodatesNumber` from the 
                     :guilabel:`Field Name` dropdown.
                  #. Click the :guilabel:`Data Type` dropdown, select
                     :guilabel:`Autocomplete` from the dropdown,
                     and configure the following fields:

                     .. list-table:: 
                        :header-rows: 1
                        :widths: 20 80
   
                        * - UI Field Name 
                          - Configuration
    
                        * - :guilabel:`Max Grams`
                          - ``<maximum number of characters to index per sequence, numeric value>``

                        * - :guilabel:`Min Grams`
                          - ``<minimum number of characters to index per sequence, numeric value.``
                         


                        * - :guilabel:`Tokenization`
                          - :guilabel:`edgeGram`

                        * - :guilabel:`Fold Diacritics`
                          - :guilabel:`true`
                     
                     
                     Very low values for ``Min Grams`` might result in a very large index. 

                  #. Click :guilabel:`Add` to add the field to the
                     :guilabel:`Field Mappings` table.
                  #. Click :guilabel:`Add Field` in the :guilabel:`Field
                     Mappings` section and repeat step **d** to step
                     **f** to configure the settings for the following
                     fields: 

                     - ``lastScrapedDate``
                     - ``numberOfNights``

                  #. Click :guilabel:`Save Changes`. 

               .. tab:: JSON Editor 
                  :tabid: jsoneditor

                  a. Replace the default index definition with the 
                     following example index definition.

                     .. code-block:: json 

                        {
                          "mappings": {
                          "dynamic": false,
                            "fields": {
                              "accommodatesNumber": [
                                {
                                  "dynamic": true,
                                  "type": "document"
                                },
                                {
                                  "minGrams": 1,
                                  "type": "autocomplete"
                                }
                              ],
                              "lastScrapedDate": [
                                {
                                  "dynamic": true,
                                  "type": "document"
                                },
                                {
                                  "type": "autocomplete"
                                }
                              ],
                              "maximumNumberOfNights": [
                                {
                                  "dynamic": true,
                                  "type": "document"
                                },
                                {
                                  "minGrams": 1,
                                  "type": "autocomplete"
                                }
                              ]
                            }
                          }
                        }

                  #. Click :guilabel:`Next`.
   
   .. step:: Click :guilabel:`Create Search Index`.
      
      The :guilabel:`You're All Set!` modal window displays to indicate that |fts| is building your index.

   .. step:: Close the :guilabel:`You're All Set!` modal window and wait for the index build to complete.