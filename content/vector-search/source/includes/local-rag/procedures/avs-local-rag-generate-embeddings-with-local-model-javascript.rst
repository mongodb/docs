.. procedure:: 
   :style: normal 

   .. step:: Download the local embedding model.

      This example uses the `mixedbread-ai/mxbai-embed-large-v1
      <https://huggingface.co/mixedbread-ai/mxbai-embed-large-v1>`__ model
      from the Hugging Face model hub. The simplest method to download the
      model files is to clone the repository using Git with Git Large File
      Storage. Hugging Face requires a `user access token
      <https://huggingface.co/docs/hub/en/security-tokens>`__ or
      `Git over SSH <https://huggingface.co/docs/hub/en/security-git-ssh>`__
      to authenticate your request to clone the repository.

      .. tabs::
        
         .. tab:: User Access Token
            :tabid: user-access-token

            .. code-block:: shell

               git clone https://<your-hugging-face-username>:<your-hugging-face-user-access-token>@huggingface.co/mixedbread-ai/mxbai-embed-large-v1

         .. tab:: SSH
            :tabid: ssh

            .. code-block:: shell

               git clone git@hf.co:mixedbread-ai/mxbai-embed-large-v1

      .. tip:: Git Large File Storage

         The Hugging Face model files are large, and require Git Large File
         Storage (`git-lfs <https://git-lfs.com/>`__) to clone the repositories.
         If you see errors related to large file storage, ensure you have
         installed git-lfs.

   .. step:: Get the local path to the model files.

      Get the path to the local model files on your machine. This is the
      parent directory that contains the git repository you just cloned.
      If you cloned the model repository inside the project directory you
      created for this tutorial, the parent directory path should resemble:

      ``/Users/<username>/local-rag-mongodb``

      Check the model directory and make sure it contains an ``onnx`` directory
      that has a ``model_quantized.onnx`` file:

      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            cd mxbai-embed-large-v1/onnx
            ls

         .. output::
            :language: console

            model.onnx      model_fp16.onnx     model_quantized.onnx

   .. step:: Generate embeddings.

      a. Navigate back to the ``local-rag-mongodb`` parent directory.

      #. Create a file called ``get-embeddings.js``, and paste the following code
         into it:

         .. literalinclude:: /code-examples/tested/javascript/driver/vector_search/local_rag/get-embeddings.snippet.local-rag-get-embeddings.js
            :language: javascript
            :caption: get-embeddings.js
            :category: usage example

         Replace the ``'/Users/<username>/local-rag-mongodb/'`` with the local
         path from the prior step.

      #. Create another file called ``generate-embeddings.js`` and paste the
         following code into it:

         .. literalinclude:: /code-examples/tested/javascript/driver/vector_search/local_rag/generate-embeddings.snippet.local-rag-create-embeddings.js
            :language: javascript
            :caption: generate-embeddings.js
            :category: usage example

         For a subset of documents in the collection, this code generates an
         embedding from the document's ``summary`` field, then updates the
         document with a new field called ``embeddings`` that contains the
         embedding.

      #. Run the following command to execute the code:

         .. io-code-block:: 
            :copyable: true

            .. input::
               :language: shell

               node --env-file=.env generate-embeddings.js

            .. output:: /code-examples/tested/javascript/driver/vector_search/local_rag/local-rag-create-embeddings-output.sh
               :language: console
               :visible: false
