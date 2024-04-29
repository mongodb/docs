.. procedure::
   :style: normal

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

      .. include:: /includes/fact-avs-quick-start-intro.rst

      a. Copy and paste the following sample query into your terminal

         .. note:: 

            Pasting the ``queryVector`` in the sample code into your
            terminal might take a while depending on your machine.

      #.  Verify your query syntax and then run it using {+mongosh+}.
      
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
