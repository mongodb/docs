.. procedure:: 
   :style: normal

   .. step:: Create a file named ``AtlasVectorSearchTutorial.java``.

   .. step:: Copy and paste the code for the pre-filter operator you want to try into the ``AtlasVectorSearchTutorial.java`` file.
 
      .. include:: /includes/avs/extracts/fts-vector-search-tutorial-queries-desc.rst 

      .. tabs:: 

         .. tab:: Pre-Filter by AND Operator 
            :tabid: and-operator

            .. include:: /includes/avs/extracts/fts-vector-search-tutorial-simple-query-desc.rst

            .. literalinclude:: /includes/avs/tutorial/filter-by-and-query.java  
               :language: java
               :linenos:
               :dedent:
               :emphasize-lines: 21


         .. tab:: Pre-Filter by OR and AND Operators 
            :tabid: or-and-operator

            .. include:: /includes/avs/extracts/fts-vector-search-tutorial-advanced-query-desc.rst

            .. literalinclude:: /includes/avs/tutorial/filter-by-or-and-query.java  
               :language: java
               :linenos:
               :dedent:
               :emphasize-lines: 20

   .. step:: Replace the ``<connection-string>`` with your |service| connection string and then save the file.

      Ensure that your connection string includes your database user's
      credentials. To learn more, see :ref:`connect-via-driver`. 

   .. step:: Compile and run ``AtlasVectorSearchTutorial.java`` file.

      .. tabs:: 
         :hidden:

         .. tab:: Pre-Filter by AND Operator 
            :tabid: and-operator

            .. io-code-block::
               :copyable: true 

               .. input:: 
                  :language: shell 

                  javac AtlasVectorSearchTutorial.java
                  java AtlasVectorSearchTutorial

               .. output:: /includes/avs/tutorial/filter-by-and-query-java-output.js
                  :language: json 
                  :linenos:
                  :visible: true

         .. tab:: Pre-Filter by OR and AND Operators 
            :tabid: or-and-operator

            .. io-code-block::
               :copyable: true 

               .. input:: 
                  :language: shell 

                  javac AtlasVectorSearchTutorial.java
                  java AtlasVectorSearchTutorial

               .. output:: /includes/avs/tutorial/filter-by-or-and-query-java-output.js
                  :language: json 
                  :linenos:
                  :visible: true
