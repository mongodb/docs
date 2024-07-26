.. procedure::
   :style: normal

   .. step:: `Download and install <https://www.mongodb.com/try/download/shell>`__ ``mongosh`` .

   .. step:: Connect to your cluster in {+mongosh+}.

      Open {+mongosh+} in a terminal window and connect to your
      {+cluster+}. For detailed instructions on connecting, see
      :ref:`Connect via mongosh <connect-mongo-shell>`.

   .. step:: Switch to the ``sample_mflix`` database. 

      .. io-code-block::
         :copyable: true
      
         .. input::
            :language: shell

            use sample_mflix
      
         .. output:: 
            :language: shell
      
            switched to db sample_mflix

   .. step:: Construct and run your vector search query. 

      a. Copy and paste the following sample query into your terminal and then 
         run it using {+mongosh+}.

         .. include:: /includes/fact-avs-quick-start-intro.rst
      
      .. io-code-block::
         :copyable: true 

         .. input:: /includes/avs-examples/pipeline-stage-examples/basic-query.sh
            :language: json
            :linenos: 

         .. output:: /includes/avs-examples/pipeline-stage-examples/basic-query-shell-output.js
            :language: js
            :linenos:   

      To learn more about this pipeline stage, see
      :ref:`return-vector-search-results`. 
