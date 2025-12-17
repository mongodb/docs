To override the default read concern level, use the ``readConcern``
option. The :dbcommand:`getMore` command uses the ``readConcern`` level
specified in the originating :dbcommand:`aggregate` command.

The following operation on the ``movies`` collection from the ``sample_mflix``
database specifies a :ref:`read concern <read-concern>` of 
:readconcern:`"majority"` to read the most recent copy of the data confirmed 
as having been written to a majority of the nodes.

.. important::

   - .. include:: /includes/fact-aggregate-readConcern.rst

   - .. include:: /includes/fact-readConcern-most-recent-data-in-node.rst

.. literalinclude:: /code-examples/tested/command-line/mongosh/aggregation/pipelines/read-concern/run-pipeline.snippet.agg-read-concern.js
   :language: javascript
   :category: usage example
   
.. include:: /includes/usage-read-concern-majority.rst