.. step:: Enable Atlas SQL in Atlas

   .. tabs::

      .. tab:: Quickstart
         :tabid: quickstart

         To enable the {+sql-interface+} with an |service|-managed {+fdi+}:


         a. .. include:: /includes/nav/list-db-deployments-page.rst

         #. On the deployment you want to query with SQL, connect with :guilabel:`Atlas SQL`.

            - Click the :guilabel:`Connect` link at the bottom of your 
              deployment card, under :guilabel:`Atlas SQL`.

            - A connection dialog box opens.

         #. Select :guilabel:`Quick Start`.

         #. Click :guilabel:`Create` to create an |service| SQL connection for your cluster.
                        
            - |service| creates and manages a {+fdi+} in the background to 
              support the SQL connection.
                            
            - To view or delete the {+fdi+} created with 
              :guilabel:`Quick Start`:
                            
              .. include:: /includes/nav/list-data-federation.rst
                            
            - Your {+fdi+} appears under :guilabel:`Quick Start {+asql+} 
              {+fdi+}`. You cannot modify this {+fdi+}.

         #. From the :guilabel:`Select your driver` dropdown, select a driver.

         #. Select a database and copy your connection settings.

            - Select a database from the :guilabel:`Database` dropdown.

            - Save your connection information. You'll need this 
              in a later step.

      .. tab:: Advanced Configuration
         :tabid: advanced

         This page guides you through setting up your own {+fdi+} and importing 
         sample data.

         .. image:: /images/data-federation/atlas-sql-getting-started.png 
            :alt: MongoDB {+asql+} setup diagram

         Prerequisites
         -------------

         - A :ref:`MongoDB database user <mongodb-users>` with which 
           to connect.

         Create a {+FDI+}
         -------------------------------------------

         To create a {+fdi+} and map it to sample data:

         .. include:: /includes/create-fdi

         To learn more about configuring {+adf+} with real data stores, see 
         :ref:`config-adf`.

         Connect to Your {+FDI+}
         ---------------------------------------------

         To connect to your {+fdi+} and query sample data or your own data with 
         {+asql+}, see :ref:`Connect <sql-connect>`.

         For a tutorial on connecting with free tools, 
         see :ref:`sql-connect-tutorial`.
