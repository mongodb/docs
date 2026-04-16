You can optionally index additional fields to pre-filter your data.
You can filter on {+avs-filter-types+}. Filtering your data is useful
to narrow the scope of your semantic search and increase the accuracy
of search results.

.. include:: /includes/avs/facts/fact-avs-filter-performance.rst

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
         "type": "autoEmbed",
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