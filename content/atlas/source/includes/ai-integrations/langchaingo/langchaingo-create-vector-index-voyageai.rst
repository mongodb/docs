To enable vector search queries on your vector store, create a {+avs+} index on
the ``langchaingo_db.test`` collection.

Add the following imports to the top of your ``main.go`` file:

.. code-block:: go

   import (
     // Other imports...
     "fmt"
     "time"

     "go.mongodb.org/mongo-driver/v2/bson"
   )

Define the following functions in your ``main.go`` file outside of your
``main()`` function. These functions create and manage a vector search index for
your MongoDB collection:

#. The ``SearchIndexExists`` function checks if a search index with the
   specified name exists and is queryable.

#. The ``CreateVectorSearchIndex`` function creates a vector search index on the
   specified collection. This function blocks until the index is created and
   queryable.

.. literalinclude:: /includes/ai-integrations/langchaingo/langchaingo-create-vector-index-voyageai.go
   :language: go
   :copyable:
   :dedent:
   :start-after: start-create-vector-search-index
   :end-before: end-create-vector-search-index

Create the vector store collection and index by calling the preceding functions
in your ``main()`` function. Add the following code to the end of your
``main()`` function:

.. literalinclude:: /includes/ai-integrations/langchaingo/langchaingo-create-vector-index-voyageai.go
   :language: go 
   :dedent: 
   :copyable:
   :start-after: start-search-index-example
   :end-before: end-search-index-example

Save the file, then run the following command to create your {+avs+}
index.

.. io-code-block::
   :copyable: true

   .. input::
      :language: sh

      go run main.go

   .. output::
      :language: json
      :visible: false

      Checking if search index exists.
      Creating vector search index...
      Successfully created vector search index.

.. tip::

   After running ``main.go``, you can view your vector search index :ref:`in the
   {+atlas-ui+} <atlas-ui-view-indexes>` by navigating to the
   ``langchaingo_db.test`` collection in your {+cluster+}.
