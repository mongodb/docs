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

         .. literalinclude:: /includes/avs/local-rag/get-embeddings.js
            :language: javascript
            :caption: get-embeddings.js

         Replace the ``'/Users/<username>/local-rag-mongodb/'`` with the local
         path from the prior step.

      #. Create another file called ``generate-embeddings.js`` and paste the
         following code into it:

         .. literalinclude:: /includes/avs/local-rag/generate-embeddings.js
            :language: javascript
            :caption: generate-embeddings.js
            :linenos:

         This code includes a few lines to test that you have correctly
         downloaded the model and are using the correct path. Run the following
         command to execute the code:

         .. io-code-block:: 
            :copyable: true

            .. input::
               :language: shell

               node --env-file=.env generate-embeddings.js

            .. output::
               :language: console
               :visible: false

               Tensor {
                  dims: [ 1, 1024 ],
                  type: 'float32',
                  data: Float32Array(1024) [
                     -0.01897735893726349,  -0.001120976754464209,  -0.021224822849035263,
                     -0.023649735376238823,   -0.03350808471441269, -0.0014186901971697807,
                     -0.009617107920348644,    0.03344292938709259,    0.05424851179122925,
                     -0.025904450565576553,   0.029770011082291603, -0.0006215018220245838,
                     0.011056603863835335,  -0.018984895199537277,    0.03985185548663139,
                     -0.015273082070052624,   -0.03193040192127228,   0.018376577645540237,
                     -0.02236943319439888,    0.01433168537914753,    0.02085157483816147,
                     -0.005689046811312437,   -0.05541415512561798,  -0.055907104164361954,
                     -0.019112611189484596,    0.02196515165269375,   0.027313007041811943,
                     -0.008618313819169998,   0.045496534556150436,    0.06271681934595108,
                     -0.0028660669922828674,   -0.02433634363114834,    0.02016191929578781,
                     -0.013882477767765522,  -0.025465600192546844,  0.0000950733374338597,
                     0.018200192600488663,  -0.010413561016321182,  -0.002004098379984498,
                     -0.058351870626211166,    0.01749623566865921,  -0.013926318846642971,
                     -0.00278360559605062,  -0.010333008132874966,   0.004406726453453302,
                     0.04118744656443596,    0.02210155501961708,  -0.016340743750333786,
                     0.004163357429206371,  -0.018561601638793945,  0.0021984230261296034,
                     -0.012378614395856857,   0.026662321761250496,  -0.006476820446550846,
                     0.001278138137422502,  -0.010084952227771282,  -0.055993322283029556,
                     -0.015850437805056572,   0.015145729295909405,    0.07512971013784409,
                     -0.004111358895897865,  -0.028162647038698196,   0.023396577686071396,
                     -0.01159974467009306,   0.021751703694462776,   0.006198467221111059,
                     0.014084039255976677, -0.0003913900291081518,   0.006310020107775927,
                     -0.04500332102179527,   0.017774192616343498,  -0.018170733004808426,
                     0.026185045018792152,   -0.04488714039325714,  -0.048510149121284485,
                     0.015152698382735252,   0.012136898003518581,     0.0405895821750164,
                     -0.024783289059996605,   -0.05514788627624512,    0.03484730422496796,
                     -0.013530988246202469,     0.0319477915763855,    0.04537525027990341,
                     -0.04497901350259781,   0.009621822275221348,  -0.013845544308423996,
                     0.0046155862510204315,    0.03047163411974907,  0.0058857654221355915,
                     0.005858785007148981,    0.01180865429341793,    0.02734190598130226,
                     0.012322399765253067,    0.03992653638124466,   0.015777742490172386,
                     0.017797520384192467,    0.02265017107129097,  -0.018233606591820717,
                     0.02064627595245838,
                     ... 924 more items
                  ],
                  size: 1024
                  }

      #. Optionally, after you have confirmed you are successfully generating embeddings
         with the local model, you can uncomment the code in lines 35-52 to generate
         embeddings for all the documents in the collection. Save the file.

         Then, run the command to execute the code:

         .. io-code-block:: 
            :copyable: true

            .. input::
               :language: shell

               node --env-file=.env generate-embeddings.js

            .. output:: /includes/avs/local-rag/generate-embeddings-javascript-output.sh
               :visible: false
