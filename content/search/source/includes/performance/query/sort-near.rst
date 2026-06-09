Use ``sort``, ``near``, or ``returnStoredSource`` Instead of  ``$sort``
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- For sorting numeric, date, string, boolean, UUID, and objectID 
  fields, use the ``sort`` option with the :pipeline:`$search` stage. 
  To learn more, see :ref:`sort-ref`.  
- For sorting geo fields, use the :ref:`near <near-ref>` operator. 
- To sort other fields, use ``$sort`` and :ref:`returnStoredSource
  <fts-return-stored-source-option>` fields.  