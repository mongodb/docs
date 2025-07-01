.. procedure:: 
   :style: normal 

   .. step:: Set up and initialize the .NET/C# project for the query.

      a. Create a new directory called ``search-with-unionwith`` and
         initialize your project with the dotnet new command. 
  
         .. code-block:: bash

            mkdir search-with-unionwith
            cd search-with-unionwith
            dotnet new console

      #. Add the .NET/C# Driver to your project as a dependency.

         .. code-block:: bash

            dotnet add package MongoDB.Driver

   .. step:: Copy and paste the query into the ``Program.cs`` file.

      .. include:: /includes/fts/extracts/search-with-unionwith-query-desc.rst 

      .. tabs:: 

         .. tab:: Basic Example 
            :tabid: basic

            .. include:: /includes/fts/extracts/search-with-unionwith-basic-query-desc.rst 

            .. literalinclude:: /includes/fts/search-with-unionwith/basic-query.cs 
               :language: csharp
               :linenos:
               :dedent:
               :emphasize-lines: 10

         .. tab:: Facet Example 
            :tabid: facet

            .. include:: /includes/fts/extracts/search-with-unionwith-facet-query-desc.rst 

            .. literalinclude:: /includes/fts/search-with-unionwith/facet-query.cs 
               :language: csharp
               :linenos:
               :dedent:
               :emphasize-lines: 9

   .. step:: Replace the ``<connection-string>`` in the query and then save the file.

      Ensure that your connection string includes your database user's
      credentials. To learn more, see :ref:`connect-via-driver`. 

   .. step:: Compile and run the ``Program.cs`` file.

      .. tabs:: 
         :hidden:

         .. tab:: Basic Example 
            :tabid: basic

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: bash
        
                  dotnet run search-with-unionwith.csproj

               .. output:: 
                  :language: javascript

                  { "name" : "XLR8 Mobile", "number_of_employees" : 21, "founded_year" : 2006, "score" : 2.0815043449401855, "source" : "companies" }
                  { "name" : "Pulse Mobile", "number_of_employees" : null, "founded_year" : null, "score" : 2.0815043449401855, "source" : "companies" }
                  { "name" : "T-Mobile", "number_of_employees" : null, "founded_year" : null, "score" : 2.0815043449401855, "source" : "companies" }
                  { "business_name" : "T. MOBILE", "address" : { "city" : "BROOKLYN", "zip" : 11209, "street" : "86TH ST", "number" : 440 }, "source" : "inspections", "score" : 2.9009163379669189 }
                  { "business_name" : "BOOST MOBILE", "address" : { "city" : "BRONX", "zip" : 10458, "street" : "E FORDHAM RD", "number" : 261 }, "source" : "inspections", "score" : 2.9009163379669189 }
                  { "business_name" : "SPRING MOBILE", "address" : { "city" : "SOUTH RICHMOND HILL", "zip" : 11419, "street" : "LIBERTY AVE", "number" : 12207 }, "source" : "inspections", "score" : 2.9009163379669189 }

         .. tab:: Facet Example 
            :tabid: facet

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: bash
        
                  dotnet run search-with-unionwith.csproj

               .. output:: 
                  :language: javascript

                  { 
                    "allDocs" : [
                      { "name" : "XLR8 Mobile", "number_of_employees" : 21, "founded_year" : 2006, "score" : 3.3304071426391602, "source" : "companies", "source_count" : NumberLong(52) }, 
                      { "name" : "Pulse Mobile", "number_of_employees" : null, "founded_year" : null, "score" : 3.3304071426391602, "source" : "companies", "source_count" : NumberLong(52) }, 
                      { "name" : "T-Mobile", "number_of_employees" : null, "founded_year" : null, "score" : 3.3304071426391602, "source" : "companies", "source_count" : NumberLong(52) }, 
                      { "business_name" : "T. MOBILE", "address" : { "city" : "BROOKLYN", "zip" : 11209, "street" : "86TH ST", "number" : 440 }, "score" : 2.9009163379669189, "source" : "inspections", "source_count" : NumberLong(456) }, 
                      { "business_name" : "BOOST MOBILE", "address" : { "city" : "BRONX", "zip" : 10458, "street" : "E FORDHAM RD", "number" : 261 }, "score" : 2.9009163379669189, "source" : "inspections", "source_count" : NumberLong(456) }, 
                      { "business_name" : "SPRING MOBILE", "address" : { "city" : "SOUTH RICHMOND HILL", "zip" : 11419, "street" : "LIBERTY AVE", "number" : 12207 }, "score" : 2.9009163379669189, "source" : "inspections", "source_count" : NumberLong(456) }
                    ], 
                    "totalCount" : [
                       { "_id" : "companies", "totalCount" : NumberLong(52) }, 
                       { "_id" : "inspections", "totalCount" : NumberLong(456) }
                    ] 
                  }
