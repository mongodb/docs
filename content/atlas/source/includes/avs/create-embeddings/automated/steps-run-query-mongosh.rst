.. procedure:: 
   :style: normal 

   .. step:: Connect to your deployment by using {+mongosh+}.

      Open {+mongosh+} in a terminal window and connect to your 
      deployment. For detailed instructions on connecting, see 
      :ref:`connect-mongo-shell`.

   .. step:: Switch to the ``sample_airbnb`` database.

      Run the following command at {+mongosh+} prompt:

      .. io-code-block::
         :copyable: true 

         .. input:: 
            :language: sh

            use sample_airbnb 

         .. output:: 
            :language: sh 

            switched to db sample_airbnb

   .. step:: Run the following query.

      .. io-code-block:: 
         :copyable: true 

         .. input:: /includes/avs/create-embeddings/automated/mongosh-query.sh 
            :language: javascript 
            :linenos: 

         .. output:: /includes/avs/create-embeddings/automated/mongosh-query-output.js
            :language: javascript 
            :visible: false