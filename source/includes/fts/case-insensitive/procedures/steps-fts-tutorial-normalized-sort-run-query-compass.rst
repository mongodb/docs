.. procedure:: 
   :style: normal 

   .. step:: Connect to your {+cluster+} in |compass|.

      Open |compass| and connect to your {+cluster+}. For detailed
      instructions on connecting, see :ref:`atlas-connect-via-compass`.

   .. step:: Use the ``movies`` collection in the ``sample_mflix`` database.

      On the :guilabel:`Database` screen, click the ``sample_mflix``
      database, then click the ``movies`` collection.

   .. step:: Run an |fts| query against the collection.

      .. include:: /includes/fts/extracts/fts-normalized-sort-query-desc.rst

      .. include:: /includes/fts/extracts/fts-normalized-sort-query-stages.rst

      To run this query in |compass|: 

      a. Click the :guilabel:`Aggregations` tab.
      #. Click :guilabel:`Select...`, then configure each of the
         following pipeline stages by selecting the stage from the 
         dropdown and adding the query for that stage. Click
         :guilabel:`Add Stage` to add additional stages. 

         .. list-table::
            :header-rows: 1
            :widths: 25 75

            * - Pipeline Stage
              - Query

            * - ``$search``
              - .. code-block:: javascript
                   :copyable: true 

                    {
                      "index": "case-insensitive-sort",
                      "text": {
                        "path": "title",
                        "query": "train",
                      },
                      "sort": {
                        "title": 1,
                      }
                    }

            * - ``$limit``
              - ``5``

            * - ``$project``
              - .. code-block:: javascript
                   :copyable: true 

                   {
                     "_id": 1,
                     "title": 1,
                     "awards": 1,
                     "score": { $meta: "searchScore" }
                   }
                 
         If you :compass:`enabled </aggregation-pipeline-builder/#set-the-documents-limit-or-auto-preview-documents>` 
         :guilabel:`Auto Preview`, |compass| displays the following
         documents next to the ``$project`` pipeline stage: 

         .. code-block:: json
            :copyable: false 

            _id: ObjectId('573a139cf29313caabcf662c')
            title: 'Atomic Train'
            awards: Object
            score: 3.317898988723755

            _id:  ObjectId("64de50ae2932de4dd3203061")
            title: 'atomic train'
            awards: Object
            score: 3.317898988723755

            _id: ObjectId('573a13bbf29313caabd52ff4')
            title: 'How to Train Your Dragon'
            awards: Object
            score: 2.228306293487549

            _id: ObjectId("64de50da2932de4dd3204393"),
            title: 'how to train your dragon'
            awards: 
            score: 2.228306293487549

            _id: ObjectId('573a13ccf29313caabd83281')
            title: 'How to Train Your Dragon 2'
            awards: object
            score: 2.0173802375793457        

         .. include:: /includes/fts/extracts/fts-normalized-sort-query-results.rst

         .. code-block:: json 
            :copyable: false 

            _id: ObjectId('573a139cf29313caabcf662c')
            title: 'Atomic Train'
            awards: Object
            score: 3.317898988723755

            _id: ObjectId('573a13bbf29313caabd52ff4')
            title: 'How to Train Your Dragon'
            awards: Object
            score: 2.228306293487549

            _id: ObjectId('573a13ccf29313caabd83281')
            title: 'How to Train Your Dragon 2'
            awards: 
            score: 2.0173802375793457

            _id: ObjectId('573a13b1f29313caabd36490')
            title: 'Howard Zinn: You Can't Be Neutral on a Moving Train'
            awards: Object
            score: 1.446497917175293

            _id: ObjectId('573a13c8f29313caabd78a6b')
            title: 'Last Train Home'
            awards: Object
            score: 2.8655927181243896

         .. include:: /includes/fts/extracts/fts-normalized-sort-query-run-query.rst 

   .. step:: Expand your query results.

      |compass| might not display all the fields inside objects and all
      the values inside arrays for the documents it returns in the
      results. To view all the fields and values, expand the field in
      the results. 
