To create a |fts| index through the :driver:`Node Driver </node/current/>`:

1. Define the search index from your application.

#. Run the ``createSearchIndex`` or ``createSearchIndexes`` helper method.

.. note::

   The {+fts+} index management methods run asynchronously. The
   driver methods can return before confirming that they ran
   successfully. To determine the current status of the indexes, call the
   ``listSearchIndexes()`` method on your collection.

.. procedure::
   :style: normal

   .. step:: Create a file named ``create-index.js``.

   .. step:: Define the search index.

      .. tabs:: 

         .. tab:: Create One Search Index
            :tabid: create-one

            Replace the placeholder values in the following example application named
            ``create-index.js``, which uses the ``createSearchIndex`` command to define 
            a |fts| index:

            .. list-table::
               :widths: 20 80
               :header-rows: 1

               * - Value
                 - Description

               * - ``<connectionString>`` 
                 - Your |service| connection string. To learn more, see 
                   :ref:`connect-via-driver`.

               * - ``<databaseName>``
                 -  Database for which you want to create the index.

               * - ``<collectionName>``   
                 - Collection for which you want to create the index.

               * - ``<indexName>`` 
                 - Name of your index. If you omit the index name, |fts| 
                   names the index ``default``.

               * - ``<IndexDefinition>``
                 - The definition of your index. To learn about index definition syntax, see :ref:`ref-index-definitions`.  

            .. literalinclude:: /includes/fts/search-index-management/create-index.js
               :caption: create-index.js
               :language: javascript
               :copyable:

         .. tab:: Create Multiple Search Indexes
            :tabid: create-multiple

            .. list-table::
               :widths: 20 80
               :header-rows: 1

               * - Value
                 - Description

               * - ``<connectionString>`` 
                 - Your |service| connection string. To learn more, see 
                   :ref:`connect-via-driver`.

               * - ``<databaseName>``
                 -  Database for which you want to create the index.

               * - ``<collectionName>``   
                 - Collection for which you want to create the index.

               * - ``<indexName>`` 
                 - Name of your index. If you omit the index name, |fts| 
                   names the index ``default``.

               * - ``<IndexDefinition>``
                 - The definition of your index. To learn about index definition syntax, see :ref:`ref-index-definitions`.

            Replace the placeholder values in the following example application named
            ``create-index.js``, which uses the ``createSearchIndexes`` command to define 
            a |fts| index:  

            .. literalinclude:: /includes/fts/search-index-management/create-indexes.js
               :caption: create-index.js
               :language: javascript
               :copyable:        

   .. step:: Run the sample application to create the index.
      
      Use the following command:

      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            node create-index.js

         .. output::
            :visible: false

            <index-name>
