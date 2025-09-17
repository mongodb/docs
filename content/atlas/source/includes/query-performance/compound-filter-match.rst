Use ``compound.filter`` Instead of ``$match``
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

For queries that require multiple filtering operations, use the 
:ref:`compound-ref` operator with ``filter`` clauses. If you must use 
the :pipeline:`$match` stage in your aggregation pipeline, consider 
using the :ref:`storedSource <fts-stored-source-definition>` option to 
store only the fields that your :pipeline:`$match` condition needs. You 
can then use the :pipeline:`$search` :ref:`returnStoredSource 
<fts-return-stored-source-option>` option to retrieve stored fields  
and avoid the ``mongod`` full document lookup.

.. seealso:: 

   - :ref:`perf-ref-stored-source`
   - :ref:`$match Example <fts-return-stored-source-egs>`