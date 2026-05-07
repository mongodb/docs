.. procedure:: 
   :style: normal 

   .. step:: Connect to your deployment by using {+mongosh+}.

      Open {+mongosh+} in a terminal window and connect to your 
      deployment. For detailed instructions on connecting, see 
      :ref:`connect-mongo-shell`.

   .. step:: Switch to the ``sample_mflix`` database.

      Run the following command at {+mongosh+} prompt:

      .. io-code-block::
         :copyable: true 

         .. input:: 
            :language: sh

            use sample_mflix 

         .. output:: 
            :language: sh 

            switched to db sample_mflix

   .. step:: Run the following query.

      .. io-code-block::
         :copyable: true 

         .. input:: /includes/pipeline-stage/vectorSearch/code-snippets/shell/auto-embed-query-quickstart.sh
            :language: json
            :linenos: 

         .. output:: /includes/pipeline-stage/vectorSearch/code-snippets/output/auto-embed-quickstart-query-shell-output.js
            :language: js
            :linenos:
            :visible: false 
         
      .. include:: /includes/quick-start/facts/fact-avs-auto-embed-quick-start-query-intro.rst