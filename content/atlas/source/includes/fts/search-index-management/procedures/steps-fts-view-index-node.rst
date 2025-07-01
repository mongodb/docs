To retrieve your |fts| indexes through the :driver:`Node Driver </node/current/>`,
use the ``listSearchIndexes`` helper method.

Example
~~~~~~~

You can use the following sample application named ``list-indexes.js`` 
to return the indexes on your collection. Specify the following values:

- Your |service| connection string. To learn more, see :ref:`connect-via-driver`.
- The database and collection that contains the search indexes 
  that you want to retrieve.
- The index name if you want to retrieve a specific index. To return all
  indexes on the collection, omit this value.

.. note:: 

   The ``listSearchIndexes`` command returns a cursor. As a result, 
   it doesn't immediately return the indexes matched by the command. 
   To access the results, use a cursor paradigm such 
   as the ``toArray()`` method. To learn more, see :driver:`Access Data From a Cursor 
   </node/current/fundamentals/crud/read-operations/cursor/>`.

.. literalinclude:: /includes/fts/search-index-management/list-indexes.js
   :caption: list-indexes.js
   :language: javascript
   :copyable:

To run the sample application, use the following command.
Your results should resemble the example output:

.. io-code-block::
   :copyable: true

   .. input::
      :language: shell

      node list-indexes.js

   .. output::
      :language: json

      [
         {
            id: '648b4ad4d697b73bf9d2e5e0',
            name: 'default',
            status: 'READY',
            queryable: true,
            latestDefinition: { mappings: { dynamic: true } }
         },
         {
            id: '648b4ad4d697b73bf9d2e5e1',
            name: 'example-index',
            status: 'PENDING',
            queryable: false,
            latestDefinition: {
               mappings: { dynamic: false, fields: { text: { type: 'string' } } }
            }
         }
      ]
