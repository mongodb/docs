.. procedure::
   :style: normal

   .. include:: /includes/crud-embeddings/manual/procedures/steps-avs-csharp-config.rst

   .. step:: Install and import dependencies.

      In a terminal window, run the following command:

      .. code-block::

         dotnet add package MongoDB.Driver

   .. step:: Set your environment variables.

      Export your environment variables, ``set`` them in PowerShell, or use
      your IDE's environment variable manager to make the MongoDB connection string 
      and |voyage| API key available to your project.

      .. code-block::

         export VOYAGE_API_KEY="<api-key>"
         export MONGODB_URI="<connection-string>"

      Replace the ``<api-key>`` placeholder value with your |voyage| API key.

      .. include:: /includes/shared/facts/find-connection-string.rst

   .. step:: Define a function to generate vector embeddings.

      Create a new class in a same-named file named ``AIService.cs`` and paste 
      the following code. This code defines an async Task named
      ``GetEmbeddingsAsync()`` to generate a array of embeddings for an array
      of given string inputs. This function uses |voyage|'s
      ``voyage-3-large`` model to generate an embedding for a given input.

      .. literalinclude:: /includes/rag/code-snippets/ingest/csharp/AIService-GetEmbeddingsAsync-VoyageAI.cs
         :language: csharp
         :copyable:
         :caption: AIService.cs
