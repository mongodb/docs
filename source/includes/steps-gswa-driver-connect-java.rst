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
      
   .. step:: Select ``Java`` from the :guilabel:`Driver` dropdown.

      Select your version of the driver from the dropdown. The connection
      string displays.
      
   .. step:: Copy the provided connection string.

   .. step:: Configure the provided connection string.
      
      Replace ``<password>`` with the password specified when you created your database user.
      
      .. include:: /includes/admonitions/notes/note-escape-special-chars-pwd.rst
      
   .. step:: Connect with the sample application.

      The following sample application connects to your |service|
      cluster with your connection string and  sends a ping to 
      confirm a successful connection. To test the sample application,
      copy the following code into a file called ``Connect.java``.
      
      Replace the placeholder with your updated connection
      string:
      
      .. literalinclude:: /includes/connect.java
         :language: java
         :linenos:
         :emphasize-lines: 16
      
      Compile and run the ``Connect.java`` file by using
      an IDE or the following commands:
      
      .. io-code-block::
      
         .. input::
            :language: bash
      
            javac Connect.java
            java Connect
        
         .. output::
            :language: none
      
            Successfully connected to Atlas
      