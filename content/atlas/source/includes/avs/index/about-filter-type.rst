You can optionally index additional fields to pre-filter your data. 
You can filter on {+avs-filter-types+}. Filtering your data is useful to
narrow the scope of your semantic search and ensure that not all vectors
are considered for comparison. It reduces the number of documents
against which to run similarity comparisons, which can decrease query
latency and increase the accuracy of search results. 

You must index the fields that you want to filter by using the
``filter`` type inside the ``fields`` array. 

The following syntax defines the ``filter`` field type: 

.. code-block:: json
   :copyable: true 
   :linenos:
   :emphasize-lines: 8-9
   
   {
     "fields":[ 
       {
         "type": "vector",
         ...
       },
       {
         "type": "filter",
         "path": "<field-to-index>"
       },
       ...
     ]
   }

.. include:: /includes/avs/facts/fact-avs-pre-filtering-score-impact.rst