To retrieve your |fts| indexes through {+mongosh+}, use 
the :method:`db.collection.getSearchIndexes() 
<db.collection.getSearchIndexes()>` method.

The command has the following syntax.
If you omit the index name, |fts| returns all
indexes on the collection.

.. code-block:: javascript

   db.<collection>.getSearchIndexes("<index-name>")

Example
~~~~~~~

The following command retrieves a search
index named ``default`` from the ``movies`` collection.
Your results should resemble the example output:

.. io-code-block::
   :copyable: true 

   .. input::
      :language: shell

      db.movies.getSearchIndexes("default")

   .. output::
      :language: json

      [
         {
            id: '648b4ad4d697b73bf9d2e5e0',
            name: 'default',
            status: 'READY',
            queryable: true,
            latestDefinition: { mappings: { dynamic: true } }
         }
      ]
