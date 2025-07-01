To edit an |fts| index through the :driver:`Node Driver </node/current/>`,
use the ``updateSearchIndex`` helper method.

Example
~~~~~~~

You can use the following sample application named ``update-index.js`` 
to update an existing index definition. Specify the following values:

- Your |service| connection string. To learn more, see :ref:`connect-via-driver`.
- The database and collection where you created the search index.
- The new index definition to replace the existing definition. In the example,
  you update an index to use :ref:`static mappings <static-dynamic-mappings>`. 
  You can alter this definition to suit your specific indexing needs. To learn more, 
  see :ref:`ref-index-definitions`.
- The name of the index that you want to update.

.. literalinclude:: /includes/fts/search-index-management/update-index.js
   :caption: update-index.js
   :language: javascript
   :copyable:

To run the sample application, use the following command:

.. code-block::
   :copyable: true

   node update-index.js

.. note:: 

   The ``updateSearchIndex`` method doesn't return an output.
   You can use the {+atlas-ui+} to view the 
   :ref:`index status <node-status-ref>`.
