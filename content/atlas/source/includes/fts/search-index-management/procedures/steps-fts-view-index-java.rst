To use the :driver:`Java Driver </java/sync/current/>` to retrieve your
{+fts+} indexes on a collection:

.. procedure:: 
   :style: normal 

   .. step:: Create a new file named ``ViewIndex.java``.

   .. step:: Copy the following code example into the file. 

      The following sample application retrieves all |fts| indexes on
      a given collection.

      .. literalinclude:: /includes/fts/search-index-management/view-index.java
         :language: java
         :copyable: true 
         :linenos: 
         :emphasize-lines: 10, 13-14

   .. step:: Replace the following values and then save the file.

      - ``<connection-string>``: Your |service| connection string. To
        learn more, see :ref:`connect-via-driver`.
      - ``<database-name>`` and  ``<collection-name>``: - The name of
        the database and collection for which you want to retrieve the
        index.

   .. step:: Compile and run the file.

      .. code-block:: shell

         javac ViewIndex.java
         java ViewIndex
