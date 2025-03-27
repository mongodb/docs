Create One Index
~~~~~~~~~~~~~~~~

To create an |fts| index through the :driver:`Node Driver </node/current/>`:

1. Define the search index from your application.
      
#. Run the ``createSearchIndex`` or ``createSearchIndexes`` helper method.

The following sample application named ``create-index.js`` 
defines a search index to dynamically index the fields in your collection,
and then runs the ``createSearchIndex`` command to create the index.
To learn more, see :ref:`ref-index-definitions`.

.. procedure::
   :style: normal

   .. step:: Create a file named ``create-index.js``.

   .. step:: Define the search index.

      Replace the placeholder values in the following example:

      .. list-table::
         :widths: 20 80
         :header-rows: 1

         * - Value
           - Description

         * - ``<connection-string>`` 
           - Your |service| connection string. To learn more, see 
             :ref:`connect-via-driver`.

         * - ``<databaseName>``
           -  Database for which you want to create the index.

         * - ``<collectionName>``   
           - Collection for which you want to create the index.

         * - ``<index-name>`` 
           - Name of your index. If you omit the index name, |fts| 
             names the index ``default``.

      .. literalinclude:: /includes/fts/search-index-management/create-index.js
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

            <index-name>

Create Multiple Indexes
~~~~~~~~~~~~~~~~~~~~~~~
   
To create multiple |fts| indexes at once:

1. In your application, define an array of search indexes.
      
#. Pass the array into the ``createSearchIndexes`` command.

The following example shows how to use the ``createSearchIndexes`` 
command to create multiple indexes:

.. procedure::
   :style: normal

   .. step:: Create a file named ``create-index-mult.js``.

   .. step:: Define the search index.

      Replace the placeholder values in the following example:

      .. list-table::
         :widths: 20 80
         :header-rows: 1

         * - Value
           - Description

         * - ``<connection-string>`` 
           - Your |service| connection string. To learn more, see 
             :ref:`connect-via-driver`.

         * - ``<databaseName>``
           -  Database for which you want to create the index.

         * - ``<collectionName>``   
           - Collection for which you want to create the index.

         * - ``<first-index-name>`` 
           - Name of your first index.

         * - ``<last-index-name>``
           - Name of your last index. 

      .. literalinclude:: /includes/fts/search-index-management/create-indexes.js
         :language: javascript
         :copyable:

   .. step:: Run the sample application to create the index.
      
      Use the following command:

      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            node create-index-mult.js

         .. output::

            <index-name>
