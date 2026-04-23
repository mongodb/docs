.. procedure:: 
   :style: normal

   .. step:: Construct your vector search query.

      .. include:: /includes/quick-start/facts/fact-avs-quick-start-intro.rst

      Create a file named ``VectorQuery.scala``. Copy and paste the following
      code into the file.

      .. literalinclude:: /includes/quick-start/code-snippets/scala/basic-query.scala
         :language: scala
         :copyable: true
         :caption: VectorQuery.scala
         :emphasize-lines: 9
         :linenos:

      .. include:: /includes/quick-start/facts/fact-avs-quick-start-intro-II.rst

      To learn more about this pipeline stage, see :ref:`return-vector-search-results`.

   .. step:: Specify the ``<connection-string>``.

      .. include:: /includes/quick-start/procedures/steps-connection-string-drivers-hidden.rst

   .. step:: Update your ``Main.scala`` file.

      Create a class instance and call the function in your project's
      ``Main.scala`` file.

      .. code-block:: scala

         object Main extends App {
            private val queryInstance = new VectorQuery
            queryInstance.performVectorQuery()
         }

   .. step:: Run your query.
  
      .. io-code-block::
         :copyable: false

         .. input::
            :language: bash

            sbt:quick-start> ~run
        
         .. output:: /includes/pipeline-stage/vectorSearch/code-snippets/output/basic-query-nodejs-output.js 
            :language: js
            :linenos: 
