.. procedure::
   :style: normal

   .. include:: /includes/avs/shared/steps-avs-csharp-config.rst

   .. step:: Install and import dependencies.

      In a terminal window, run the following command:

      .. code-block::

         dotnet add package MongoDB.Driver

   .. step:: Set your environment variables.

      Export your environment variables, ``set`` them in PowerShell, or use
      your IDE's environment variable manager to make the MongoDB connection 
      and HuggingFace access token available to your project.

      .. code-block::

         export HUGGINGFACE_ACCESS_TOKEN="<access-token>"
         export MONGODB_URI="<connection-string>"

      Replace the ``<access-token>`` placeholder value with your Hugging Face access token.

      .. include:: /includes/search-shared/find-connection-string.rst

   .. step:: Define a function to generate vector embeddings.

      Create a new class in a same-named file named ``AIService.cs`` and paste 
      the following code. This code defines an async Task named
      ``GetEmbeddingsAsync()`` to generate a array of embeddings for an array
      of given string inputs. This function uses the `mxbai-embed-large-v1
      <https://huggingface.co/mixedbread-ai/mxbai-embed-large-v1>`__ 
      embedding model.

      .. literalinclude:: /includes/avs/rag/ingest/AIService-GetEmbeddingsAsync-Open-Source.cs
         :language: csharp
         :copyable:
         :caption: AIService.cs

      .. include:: /includes/avs/facts/note-hugging-face-503.rst
