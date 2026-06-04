You can optionally index additional fields to pre-filter your data.
You can filter on {+avs-filter-types+}. Filtering your data helps
narrow the scope of your semantic search and increase the accuracy
of search results. Filtered queries are typically slower than an
equivalent unfiltered query.

You must index the fields that you want to filter by using the
``filter`` type inside the ``fields`` array. The ``path`` for the
``filter`` type can be a top-level field or a child of the field
specified in the ``nestedRoot`` option. Use :ref:`dot notation
<document-dot-notation>` to specify a nested field. If you specify both
a top-level field and a field that is nested inside an array of objects,
at query-time: 

- Child-level filter fields can be used with the ``filter`` field in the
  :pipeline:`$vectorSearch` stage.
- Root-level filter fields can be used with the ``parentFilter`` field in the 
  :pipeline:`$vectorSearch` stage.

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

.. include:: /includes/pipeline-stage/vectorSearch/facts/fact-avs-pre-filtering-score-impact.rst
