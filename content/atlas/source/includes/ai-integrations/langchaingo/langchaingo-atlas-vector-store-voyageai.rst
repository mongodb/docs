In this section, you define an asynchronous function to load custom data into
MongoDB and instantiate MongoDB as a vector database, also called a `vector
store <https://python.langchain.com/docs/concepts/vectorstores/>`__.

.. procedure::
   :style: normal

   .. step:: Import the following dependencies.

      Add the following imports to the top of your ``main.go`` file.

      .. code-block:: go

         package main

         import (
           "context"
           "log"
           "os"

           "github.com/joho/godotenv"
           "github.com/tmc/langchaingo/embeddings/voyageai"
           "github.com/tmc/langchaingo/schema"
           "github.com/tmc/langchaingo/vectorstores/mongovector"
           "go.mongodb.org/mongo-driver/v2/mongo"
           "go.mongodb.org/mongo-driver/v2/mongo/options"
        )

   .. step:: Define the vector store details.

      .. include:: /includes/ai-integrations/langchaingo/langchaingo-vector-store-description.rst

      Paste the following code into your ``main.go`` file:

      .. literalinclude:: /includes/ai-integrations/langchaingo/langchaingo-create-vector-store-voyageai.go
         :language: go
         :copyable:
         :dedent:
         :start-after: start-create-vector-store
         :end-before: end-create-vector-store

   .. step:: Run your Go project.

      Save the file, then run the following command to load your data into MongoDB.

      .. io-code-block::
         :copyable: true

         .. input::
            :language: sh

            go run main.go

         .. output::
            :language: json
            :visible: false

            Connected to MongoDB Atlas.
            Successfully added 3 documents to the collection.

      .. tip::

         After running ``main.go``, if you're using |service|, you can verify your vector embeddings
         by navigating to the ``langchaingo_db.test`` namespace
         :ref:`in the {+atlas-ui+} <atlas-ui-view-collections>`.
