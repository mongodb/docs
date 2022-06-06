.. procedure::
   :style: normal

   .. step:: Navigate to your {+fdi+}.

      If it isn't already displayed, select :guilabel:`Data Federation` 
      from the left navigation panel.
   
   .. step:: Click :guilabel:`Connect` to open the {+fdi+} connection modal.

   .. step:: Select :guilabel:`Connect using the {+asql+} Interface`.

   .. step:: Select :guilabel:`JDBC Driver`.

      .. note::
   
         This tutorial uses the JDBC Driver to connect.
         See :ref:`sql-connect` for alternative connection methods.

   .. step:: Copy your connection information.

      {+adf+} provides the following information to connect to your 
      {+fdi+}:

      - URL
      - Port
      - Database

      You'll need this information in a later step.

   .. step:: Connect from DBeaver.

      .. procedure::
         :style: connected

         .. step:: Launch DBeaver.

         .. step:: Add a new driver.

            a. In DBeaver, click :guilabel:`Database` and select  
               :guilabel:`Driver Manager` from the dropdown menu.
            
            #. Click :guilabel:`New` to open the 
               :guilabel:`Create new driver` modal.

            #. In the :guilabel:`Settings` tab, enter the following 
               information:

               .. list-table::
                  :stub-columns: 1
                  :widths: 10 20
               
                  * - Driver Name
                    - ``MongoDB``
                    
                  * - Class Name
                    - ``com.mongodb.jdbc.MongoDriver``

            #. In the :guilabel:`Libraries` tab, click 
               :guilabel:`Add File` and add your JDBC driver 
               ``all.jar`` file.

               Click :guilabel:`Find Class`.

            #. Click :guilabel:`OK`. The 
               :guilabel:`Create new driver` modal closes.
         
         .. step:: Create a database connection.

            a. In DBeaver, click :guilabel:`Database` and select  
               :guilabel:`New Database Connection` from the dropdown 
               menu to open the :guilabel:`Connect to a database` modal.

            #. From the list of databases, select the ``MongoDB`` 
               database driver that you created in the previous step.

               .. tip::

                  If you don't see ``MongoDB``, select 
                  the :guilabel:`All` category inside the modal.

               Click :guilabel:`Next`.

            #. In the :guilabel:`Main` tab, enter the following 
               information: 

               .. list-table::
                  :stub-columns: 1
                  :widths: 10 20
               
                  * - JDBC URL
                    - Your JDBC URL from step 5.

                  * - Username
                    - The MongoDB user to connect with.

                  * - Password
                    - The MongoDB user's password.

            #. In the :guilabel:`Driver properties` tab, expand 
               :guilabel:`User Properties`. Add the following key-value 
               properties:

               .. list-table::
                  :stub-columns: 1
                  :widths: 10 20

                  * - database
                    - The name of your database from step 5. If you are 
                      following the tutorial, this is 
                      ``myFederatedVirtualDatabase``.

                  * - user
                    - The MongoDB user to connect with. Not required if 
                      you entered a ``Username`` in the previous step.

                  * - password
                    - The MongoDB user's password. Not required if you 
                      entered a ``Password`` in the previous step.

         .. step:: Click :guilabel:`Finish`.

   .. step:: *(Optional)* Confirm that sample can be accessed from your {+fdi+}.

      In the :guilabel:`Database Navigator`, expand your MongoDB 
      connection to verify that the sample data that the {+fdi+} store 
      is mapped to is accessible.
