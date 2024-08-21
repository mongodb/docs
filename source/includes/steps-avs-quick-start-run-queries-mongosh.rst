.. procedure::
   :style: normal

   .. step:: Download and install {+mongosh+}.

   .. step:: Connect to your {+cluster+} or local deployment in {+mongosh+}.

      .. tabs::

         .. tab:: {+service+} {+Cluster+}
            :tabid: cloud

            Open {+mongosh+} in a terminal window and connect to your |service|
            {+cluster+}. For detailed instructions on connecting, see
            :ref:`Connect via mongosh <connect-mongo-shell>`.
            
         .. tab:: Local Deployment
            :tabid: local

            In a terminal window, run ``atlas deployments connect`` and follow the prompts
            to connect to your local |service| deployment via {+mongosh+}. 
            For detailed instructions on connecting, see
            :atlascli:`Manage a Local Atlas Deployment </atlas-cli-deploy-local/#manage-a-local-atlas-deployment>`.

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
