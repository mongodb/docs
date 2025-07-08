.. procedure::
   :style: normal

   .. include:: /includes/avs/shared/steps-avs-csharp-config.rst

   .. step:: Install and import dependencies.

      In a terminal window, run the following commands:

      .. code-block::

         dotnet add package MongoDB.Driver

   .. step:: Set your environment variables.

      Export your environment variables, ``set`` them in PowerShell, or use
      your IDE's environment variable manager to make the connection string 
      and Voyage AI API key available to your project.

      .. code-block::

         export VOYAGE_API_KEY="<api-key>"
         export ATLAS_CONNECTION_STRING="<connection-string>"

      Replace the ``<api-key>`` placeholder value with your Voyage AI API key.

      .. include:: /includes/avs/shared/avs-replace-connection-string.rst

   .. step:: Define a function to generate vector embeddings.

      Create a new class in a same-named file named ``AIService.cs`` and paste 
      the following code. This code defines an async Task named
      ``GetEmbeddingsAsync`` to generate a array of embeddings for an array
      of given string inputs. This function uses Voyage AI's
      ``voyage-3-large`` model to generate an embedding for a given input.

      .. literalinclude:: /includes/avs/rag/AIService-GetEmbeddingsAsync-VoyageAI.cs
         :language: csharp
         :copyable:
         :caption: AIService.cs
