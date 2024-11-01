.. procedure::
   :style: normal

   .. step:: Construct and run your vector search query. 

      a. Copy and paste the following sample query into your terminal and then 
         run it using {+mongosh+}. {+mongosh+} might lag slightly when you paste 
         in the query due to the number of characters in the vector embedding. 

         .. include:: /includes/fact-avs-quick-start-intro.rst
      
      .. io-code-block::
         :copyable: true 

         .. input:: /includes/avs-examples/pipeline-stage-examples/basic-query.sh
            :language: json
            :linenos: 

         .. output:: /includes/avs-examples/pipeline-stage-examples/basic-query-shell-output.js
            :language: js
            :linenos:   
         
      .. include:: /includes/fact-avs-quick-start-intro-II.rst

      To learn more about this pipeline stage, see
      :ref:`return-vector-search-results`. 
