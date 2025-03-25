.. procedure::
   :style: normal

   .. step:: Connect to your |service| {+cluster+} using {+mongosh+}. 

      Open a terminal window and connect to your {+cluster+} by using
      {+mongosh+}. To learn more, see :ref:`connect-mongo-shell`. 

   .. step:: Switch to your database. 
      
      .. example:: 

         Use the ``sample_mflix`` database. To switch to the
         ``sample_mflix`` database, run the following command at
         {+mongosh+} prompt: 

         .. io-code-block::
            :copyable: true 

            .. input:: 
               :language: sh

               use sample_mflix 

            .. output:: 
               :language: sh

               switched to db sample_mflix

   .. step:: Run your |enn| query. 

      .. example::

         Copy and paste the following sample query into your terminal and
         then run it using {+mongosh+}. {+mongosh+} might lag slightly when
         you paste in the query due to the number of characters in the
         vector embedding. 

         .. io-code-block:: 
            :copyable: true 

            .. input:: /includes/avs/evaluate-results/enn-query-mongosh.sh
               :language: shell 
               :linenos:

            .. output:: /includes/avs/evaluate-results/enn-mongosh-results.sh 
               :language: shell 
               :visible: false

         .. include:: /includes/avs/extracts/avs-evaluate-results-enn-query.rst 

   .. step:: Run your |ann| query. 

      .. example:: 

         Copy and paste the following sample query into your terminal and
         then run it using {+mongosh+}. {+mongosh+} might lag slightly when
         you paste in the query due to the number of characters in the
         vector embedding. 

         .. io-code-block:: 
            :copyable: true 

            .. input:: /includes/avs/evaluate-results/ann-query-mongosh.sh
               :language: shell 
               :linenos:

            .. output:: /includes/avs/evaluate-results/ann-mongosh-results.sh
               :language: shell 
               :visible: false

         .. include:: /includes/avs/extracts/avs-evaluate-results-ann-query.rst
