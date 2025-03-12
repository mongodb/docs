.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-db-deployments-page.rst
      
   .. step:: Click :guilabel:`Connect`.
      
      Click :guilabel:`Connect` for the {+database-deployment+} to 
      which you want to connect.
      
   .. step:: Click :guilabel:`Drivers`.
      
      From the `Connect Modal 
      <https://cloud.mongodb.com/go?l=https%3A%2F%2Fcloud.mongodb.com%2Fv2%2F%3Cproject%3E%23%2Fclusters%2Fconnect%3FclusterId%3D%3Ccluster%3E>`__, click :guilabel:`Drivers`.
      
   .. step:: Select ``Go`` from the :guilabel:`Driver` dropdown.

      Select your version of the driver from the dropdown. The 
      connection string displays.
      
   .. step:: Copy the provided connection string.

   .. step:: Configure the provided connection string.
      
      Replace ``<password>`` with the password specified when you created your database user.
      
      .. include:: /includes/admonitions/notes/note-escape-special-chars-pwd.rst
      
   .. step:: Connect with the sample application.

      The following sample application connects to your |service|
      cluster with your connection string and sends a ping to 
      confirm a successful connection. To test the sample application:
      
      a. Create a new directory called ``connect`` and 
         initialize your project by using the ``go mod`` command.
      
         .. code-block:: shell
      
            mkdir connect
            cd connect
            go mod init connect
      
      #. Run the following commands to download the Go driver 
         and driver dependencies:
      
         .. code-block:: shell
      
            go get go.mongodb.org/mongo-driver/v2/mongo
            go get github.com/joho/godotenv
      
      #. In your project, create a new file called ``connect.go`` and paste 
         the following code. Make sure to replace the placeholder with 
         your updated connection string:
      
         .. literalinclude:: /includes/connect.go
            :language: go
            :linenos:
            :emphasize-lines: 15
      
      #. To run your application, use the following command:
         
         .. io-code-block::
      
            .. input::
               :language: bash
      
               go run connect.go
            
            .. output::
               :language: none
      
               Successfully connected to Atlas
