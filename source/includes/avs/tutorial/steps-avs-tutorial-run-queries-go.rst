.. procedure:: 
   :style: normal

   .. step:: Create a file named ``AtlasVectorSearchTutorial.go``.

   .. step:: Copy and paste the code for the pre-filter operator you want to try into the ``AtlasVectorSearchTutorial.go`` file.

      .. include:: /includes/avs/extracts/fts-vector-search-tutorial-queries-desc.rst 

      .. tabs:: 

         .. tab:: Pre-Filter by AND Operator 
            :tabid: and-operator

            .. include:: /includes/avs/extracts/fts-vector-search-tutorial-simple-query-desc.rst

            .. literalinclude:: /includes/avs/tutorial/filter-by-and-query.go
               :language: go
               :linenos:
               :dedent:
               :emphasize-lines: 17


         .. tab:: Pre-Filter by OR and AND Operators 
            :tabid: or-and-operator

            .. include:: /includes/avs/extracts/fts-vector-search-tutorial-advanced-query-desc.rst

            .. literalinclude:: /includes/avs/tutorial/filter-by-or-and-query.go
               :language: go
               :linenos:
               :dedent:
               :emphasize-lines: 17

   .. step:: Replace the ``<connection-string>`` with your |service| connection string and then save the file.

      Ensure that your connection string includes your database user's
      credentials. To learn more, see :ref:`connect-via-driver`. 

   .. step:: Compile and run ``AtlasVectorSearchTutorial.go`` file.

      .. tabs:: 
         :hidden:

         .. tab:: Pre-Filter by AND Operator 
            :tabid: and-operator

            .. io-code-block::
               :copyable: true 

               .. input:: 
                  :language: shell 

                  go run AtlasVectorSearchTutorial.go

               .. output:: /includes/avs/tutorial/filter-by-and-query-go-output.sh
                  :language: shell
                  :linenos:
                  :visible: true

         .. tab:: Pre-Filter by OR and AND Operators 
            :tabid: or-and-operator

            .. io-code-block::
               :copyable: true 

               .. input:: 
                  :language: shell

                  go run AtlasVectorSearchTutorial.go

               .. output:: /includes/avs/tutorial/filter-by-or-and-query-go-output.sh
                  :language: shell
                  :linenos:
                  :visible: true
