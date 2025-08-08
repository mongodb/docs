Use Dynamic Mappings
--------------------

.. include:: /includes/fts/synonyms/dynamic-intro.rst

You can use the Visual Editor or the |json| Editor in the {+atlas-ui+}
to configure the following index. To configure this index, after you
select your configuration method, select the ``movies`` collection in
the ``sample_mflix`` database. 

.. tabs:: 

   .. tab:: Visual Editor 
      :tabid: vib

      1. Click :guilabel:`Refine Your Index`.
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
              - Select ``lucene.standard`` from the dropdown if it isn't
                already selected. 
      
      #. Click :guilabel:`Add`.

   .. tab:: JSON Editor 
      :tabid: jsonib

      .. code-block:: json 

          {
            "mappings": {
              "dynamic": true
            },
            "synonyms": [
              {
                "analyzer": "lucene.standard",
                "name": "my_synonyms",
                "source": {
                  "collection": "synonymous_terms"
                }
              }
            ]
          }
