Use Static Mappings
-------------------

.. include:: /includes/fts/synonyms/static-intro.rst

You can use the Visual Editor or the |json| Editor in the {+atlas-ui+}
to configure the following index. To configure this index, after you
select your configuration method, select the ``movies`` collection in
the ``sample_mflix`` database. 

.. tabs:: 

   .. tab:: Visual Editor 
      :tabid: vib

      1. Click :guilabel:`Refine Your Index`.
      #. In the :guilabel:`Field Mappings` section, click :guilabel:`Add
         Field`.
      #. Click :guilabel:`Customized Configuration`.
      #. Configure the following settings in the :guilabel:`Add
         Field Mapping` window: 

         .. list-table:: 
            :header-rows: 1

            * - :guilabel:`Field Name` 
              - :guilabel:`Enable Dynamic Mapping`
              - :guilabel:`Data Type Configuration` 
            * - Select ``plot``.
              - Toggle to disable.
              - a. Click :guilabel:`Add Data Type`.
                #. Select :guilabel:`String` from the dropdown.
                #. Select ``lucene.english`` under ``lucene.language``
                   from the :guilabel:`Index Analyzer` dropdown.
      
      #. Click :guilabel:`Add`.
      #. In the :guilabel:`Synonyms Mappings` section, click
         :guilabel:`Add Synonym Mapping`.
      #. Configure the following settings in the :guilabel:`Add Synonym
         Mapping` window:

         .. list-table:: 
            :header-rows: 1

            * - :guilabel:`Synonym mapping name` 
              - :guilabel:`Synonym source collection`
              - :guilabel:`Analyzer`
            * - Enter ``my_synonyms``
              - Select ``synonymous_terms``.
              - Select ``lucene.english`` under ``lucene.language`` from
                dropdown. 
      
      #. Click :guilabel:`Add`.

   .. tab:: JSON Editor 
      :tabid: jsonib

      Replace the default index with the following index.

      .. code-block:: json 

          {
            "mappings": {
              "dynamic": false,
              "fields": {
                "plot": {
                  "type": "string",
                  "analyzer": "lucene.english"
                }
              }
            },
            "synonyms": [
              {
                "analyzer": "lucene.english",
                "name": "my_synonyms",
                "source": {
                  "collection": "synonymous_terms"
                }
              }
            ]
          }