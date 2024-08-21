.. procedure:: 
   :style: normal

   .. step:: Ensure that your ``CLASSPATH`` contains the following libraries.

      .. list-table::
         :widths: 30 70 

         * - ``junit``
           - 4.11 or higher version 

         * - ``mongodb-driver-sync``
           - 4.3.0 or higher version

         * - ``slf4j-log4j12``
           - 1.7.30 or higher version
  
      For more detailed installation instructions, see the 
      :ref:`MongoDB Java Driver documentation <add-mongodb-dependency>`.

   .. step:: Construct your vector search query.

      .. include:: /includes/fact-avs-quick-start-intro.rst

      a. Create a file named ``BasicQuery.java`` .

      #. Copy and paste the following sample query into the 
         ``BasicQuery.java`` file:

         .. literalinclude:: /includes/avs-examples/pipeline-stage-examples/basic-query.java
            :language: java
            :linenos:

      .. note:: 

         To run the sample code in your Maven environment, add the 
         following code above the import statements in your file.

         .. code-block:: 

            package com.mongodb.drivers;

      .. include:: /includes/fact-avs-quick-start-intro-II.rst

      To learn more about this pipeline stage, see
      :ref:`return-vector-search-results`.

   .. step:: Specify the ``<connection-string>``.

      .. include:: /includes/steps-connection-string-drivers.rst

   .. step:: Run your query.
    
      Compile and run the ``BasicQuery.java`` file:

      .. io-code-block::
         :copyable: true 

         .. input:: 
            :language: shell 

            javac BasicQuery.java
            java BasicQuery

         .. output:: /includes/avs-examples/pipeline-stage-examples/basic-query-java-output.js 
            :language: js
            :linenos: 
