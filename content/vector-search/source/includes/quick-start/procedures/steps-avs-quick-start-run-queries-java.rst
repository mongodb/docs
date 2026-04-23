.. procedure:: 
   :style: normal

   .. step:: Construct your vector search query.

      .. include:: /includes/quick-start/facts/fact-avs-quick-start-intro.rst

      a. Create a file named ``BasicQuery.java``.

      #. Copy and paste the following sample query into the 
         ``BasicQuery.java`` file:

         .. literalinclude:: /includes/quick-start/code-snippets/java/basic-query.java
            :language: java
            :linenos:

      .. include:: /includes/quick-start/facts/fact-avs-quick-start-intro-II.rst

      To learn more about this pipeline stage, see
      :ref:`return-vector-search-results`.

   .. step:: Specify the ``<connection-string>``.

      .. include:: /includes/quick-start/procedures/steps-connection-string-drivers-hidden.rst

   .. step:: Run your query.
    
      Compile and run the ``BasicQuery.java`` file:

      .. io-code-block::
         :copyable: true 

         .. input:: 
            :language: shell 

            javac BasicQuery.java
            java BasicQuery

         .. output:: /includes/pipeline-stage/vectorSearch/code-snippets/output/basic-query-java-output.js 
            :language: js
            :linenos: 
