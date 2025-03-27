To use the :driver:`Java Driver </java/sync/current/>` to create an |fts| index,
construct a document that defines the search index, and then pass the document
to the ``createSearchIndex()`` or ``createSearchIndexes()`` method.
To learn more, refer to the :driver:`Driver documentation 
</java/sync/current/fundamentals/indexes/#atlas-search-indexes>`.

.. note::

   The {+fts+} index management methods run asynchronously. The
   driver methods can return before confirming that they ran
   successfully. To determine the current status of the indexes, call the
   ``listSearchIndexes()`` method.

.. procedure:: 
   :style: normal 

   .. step:: Create a new file named ``CreateIndex.java``.

   .. step:: Copy the following code example into the file. 

      .. tabs::

         .. tab:: Create One Search Index
            :tabid: create-one

            The following sample application defines a search index to dynamically 
            index the fields in your collection, and then runs the ``createSearchIndex()`` 
            method to create the index. To learn more, see :ref:`ref-index-definitions`.

            .. literalinclude:: /includes/fts/search-index-management/create-index.java
               :language: java
               :copyable:
               
         .. tab:: Create Multiple Search Indexes
            :tabid: create-multiple

            You can use the following sample application to create multiple |fts| indexes 
            at once. To do so, construct a document for each search index that 
            you wish to create, and then pass the documents as an array to 
            the ``createSearchIndexes()`` method:

            .. literalinclude:: /includes/fts/search-index-management/create-indexes.java
               :language: java
               :copyable:

   .. step:: Specify the following values and save the file.

      - Your |service| connection string. To learn more, see :ref:`connect-via-driver`.
      - The database and collection for which you want to create the index. 
      - The names of your indexes. If you omit an index's name, |fts| names the index ``default``.

      .. tabs::
         :hidden: true

         .. tab:: Create One Search Index
            :tabid: create-one

         .. tab:: Create Multiple Search Indexes
            :tabid: create-multiple
            
            - The fields to define your search index. To learn more, see :ref:`ref-index-definitions`.

   .. step:: Compile and run the file.

      .. code-block:: shell

         javac CreateIndex.java
         java CreateIndex
