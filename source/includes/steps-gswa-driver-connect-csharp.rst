.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-db-deployments-page.rst
      
   .. step:: Click :guilabel:`Connect`.
      
      Click :guilabel:`Connect` for the {+database-deployment+} to 
      which you want to connect.

   .. include:: /includes/cluster-connection-options.rst
      
   .. step:: Click :guilabel:`Drivers`.
      
      From the `Connect Modal 
      <https://cloud.mongodb.com/go?l=https%3A%2F%2Fcloud.mongodb.com%2Fv2%2F%3Cproject%3E%23%2Fclusters%2Fconnect%3FclusterId%3D%3Ccluster%3E>`__, click :guilabel:`Drivers`.
      
   .. step:: Select ``C# / .NET`` from the :guilabel:`Driver` dropdown.

      Select your version of the driver from the dropdown. The connection
      string displays.
      
   .. step:: Copy the provided connection string.

   .. step:: Configure the provided connection string.
      
      Replace ``<password>`` with the password specified when you created your database user.
      
      .. include:: /includes/admonitions/notes/note-escape-special-chars-pwd.rst
      
   .. step:: Connect with the sample application.

      The following sample application connects to your |service|
      cluster with your connection string and sends a ping to 
      confirm a successful connection. To test the sample application:
      
      a. Create a new directory called ``connect`` and 
         initialize your project by using the ``dotnet new`` command.
      
         .. code-block:: shell
      
            mkdir connect
            cd connect
            dotnet new console
      
      #. Run the following command to add the .NET/C# Driver to your project 
         as a dependency:
      
         .. code-block:: shell
      
            dotnet add package MongoDB.Driver
      
      #. Replace the contents of the ``Program.cs`` file with the following code.
         Make sure to replace the placeholder with your updated connection
         string:
      
         .. literalinclude:: /includes/connect.cs
            :language: csharp
            :linenos:
            :emphasize-lines: 7
      
      #. To run your application, use the following command:
      
         .. io-code-block::
      
            .. input::
               :language: bash
      
               dotnet run Program.cs
            
            .. output::
               :language: none
      
               Successfully connected to Atlas   
