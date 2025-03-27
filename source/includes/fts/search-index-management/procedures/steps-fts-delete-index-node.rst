To delete an |fts| index through the :driver:`Node Driver </node/current/>`,
use the ``dropSearchIndex`` helper method.

Example
~~~~~~~

You can use the following sample application named ``drop-index.js`` 
to delete an index on your collection. Specify the following values:

- Your |service| connection string. To learn more, see :ref:`connect-via-driver`.
- The database and collection where you created the search index.
- The name of the index that you want to delete.

.. literalinclude:: /includes/fts/search-index-management/drop-index.js
   :caption: drop-index.js
   :language: javascript
   :copyable:

To run the sample application, use the following command.

.. code-block::
   :copyable: true

   node drop-index.js

.. note:: 

   The ``dropSearchIndex`` method doesn't return an output. 
   You can use the {+atlas-ui+} to view the 
   :ref:`index status <node-status-ref>`.
