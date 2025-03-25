.. procedure:: 
   :style: normal

   .. step:: Construct your vector search query.

      .. include:: /includes/avs/facts/fact-avs-quick-start-intro.rst

      a. Create a file named ``BasicQuery.java``.

      #. Copy and paste the following sample query into the 
         ``BasicQuery.java`` file:

         .. literalinclude:: /includes/avs/pipeline-stage-examples/basic-query.java
            :language: java
            :linenos:

      .. include:: /includes/avs/facts/fact-avs-quick-start-intro-II.rst

      To learn more about this pipeline stage, see
      :ref:`return-vector-search-results`.

   .. step:: Specify the ``<connection-string>``.

      .. include:: /includes/steps-connection-string-drivers-hidden.rst

   .. step:: Run your query.
    
      Compile and run the ``BasicQuery.java`` file:

      .. io-code-block::
         :copyable: true 

         .. input:: 
            :language: shell 

            javac BasicQuery.java
            java BasicQuery

         .. output:: /includes/avs/pipeline-stage-examples/basic-query-java-output.js 
            :language: js
            :linenos: 
