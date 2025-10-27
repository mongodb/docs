.. procedure::
   :style: normal

   .. include:: /includes/avs/shared/steps-avs-csharp-config.rst

   .. step:: Install and import dependencies.

      In a terminal window, run the following commands:

      .. code-block::

         dotnet add package MongoDB.Driver
         dotnet add package OpenAI

   .. step:: Set your environment variables.

      Export your environment variables, ``set`` them in PowerShell, or use
      your IDE's environment variable manager to make the MongoDB connection string 
      and OpenAI API key available to your project.

      .. code-block::

         export OPENAI_API_KEY="<api-key>"
         export MONGODB_URI="<connection-string>"

      Replace the ``<api-key>`` placeholder value with your OpenAI API key.

      .. include:: /includes/search-shared/find-connection-string.rst

   .. step:: Define a function to generate vector embeddings.

      Create a new class in a same-named file named ``AIService.cs`` and paste 
      the following code. This code defines an async Task named
      ``GetEmbeddingsAsync()`` to generate a array of embeddings for an array
      of given string inputs. This function uses OpenAI's
      ``text-embedding-3-small`` model to generate an embedding for a given input.

      .. literalinclude:: /includes/avs/rag/ingest/AIService-GetEmbeddingsAsync-OpenAI.cs
         :language: csharp
         :copyable:
         :caption: AIService.cs
