To create an |fts| index through the :driver:`Node Driver </node/current/>`,
define the search index from your application and run
the ``createSearchIndex`` or ``createSearchIndexes`` helper method.

Example 
~~~~~~~

The following sample application named ``create-index.js`` 
defines a search index to dynamically index the fields in your collection,
and then runs the ``createSearchIndex`` command to create the index.
To learn more, see :ref:`ref-index-definitions`.

Specify the following values:

- Your |service| connection string. To learn more, see :ref:`connect-via-driver`.
- The database and collection for which you want to create the index. 
- The name of your index. If you omit the index name, |fts| names the index ``default``.

.. literalinclude:: /includes/fts-tutorial/search-index-management/create-index.js
   :caption: create-index.js
   :language: javascript
   :copyable:

To run the sample application, use the following command:

.. io-code-block::

   .. input::
      :language: shell

      node create-index.js

   .. output::

      <index-name>
   
You can also create multiple |fts| indexes at once. In your application, 
define an array of search indexes, and then pass the array into the 
``createSearchIndexes`` command:

.. literalinclude:: /includes/fts-tutorial/search-index-management/create-indexes.js
   :language: javascript
   :copyable:
