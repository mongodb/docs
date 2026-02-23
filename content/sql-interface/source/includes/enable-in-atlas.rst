.. step:: Enable Atlas SQL in Atlas

   .. tabs::

      .. tab:: Quickstart
         :tabid: quickstart

         This page guides you through using the :guilabel:`Quickstart` 
         configuration to create an |service|-managed {+fdi+} for use with 
         the {+sql-interface+}.

         .. important:: Quickstart Cloud Provider

            The :guilabel:`Quickstart` configuration option automatically uses
            {+aws+} as the {+fdi+} cloud provider. Once a {+fdi+} is created,
            its cloud provider cannot be changed.
            
            We recommend selecting the same cloud provider that hosts your data
            for your {+fdi+}. To use a cloud provider other than {+aws+}, refer
            to the instructions in the :guilabel:`Advanced Configuration` tab.

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

         .. image:: /images/atlas-sql-getting-started.png 
            :alt: MongoDB {+asql+} setup diagram

         Prerequisites
         -------------

         - A :ref:`MongoDB database user <mongodb-users>` with which 
           to connect.

         Create a {+FDI+}
         -------------------------------------------

         To create a {+fdi+} and map it to sample data:

         a. In |service|, go to your {+fdi+} for your project.

            i. If it's not already displayed, select the 
               organization that contains your project from the
               |ui-org-menu| in the navigation bar.

            #. If it's not already displayed, select your project 
               from the :guilabel:`Projects` menu in the navigation bar.

            #. In the sidebar, click :guilabel:`Data Federation` under 
               the :guilabel:`Services` heading.
            
            The `Data Federation <https://cloud.mongodb.com/go?l=https%3A%2F%2Fcloud.mongodb.com%2Fv2%2F%3Cproject%3E%23%2FdataFederation>`__ page displays.

         #. Click :guilabel:`Create Federated Database Instance`.

            If you have an existing {+fdi+}, instead click 
            :guilabel:`Create Federated Database` in the 
            top right corner of the dashboard. 

         #. Connect to a Data Source and add sample data to your {+fdi+}.

            You can use a sample dataset to start exploring 
            {+asql+} through {+adf+} without configuring a data source 
            yourself. This tutorial references a specific sample dataset.

            :gold:`IMPORTANT:` To connect to your own data instead, click 
            :guilabel:`Add Data Sources`. To learn more about 
            configuring different types of data sources, see 
            :ref:`config-adf`.

            If you want to configure data from a |service| cluster, you 
            must use MongoDB version 5.0 or greater for that cluster to 
            take advantage of {+asql+}.

            i. Click :guilabel:`Add Sample Data`.
            
            #. Select ``AWS S3`` from the :guilabel:`Filter` dropdown if it 
               isn't selected already.
            
            #. Expand the |s3| store ``sample-data-atlas-data-lake`` 
               if it isn't expanded already.

            For this tutorial, configure your {+fdi+} as follows using the 
            :guilabel:`Federated Database Instance` panel:
            
            i. Rename the default collection.

               Click :icon-fa4:`pencil` next to the default collection 
               ``VirtualCollection0`` to edit its name. For this tutorial, 
               rename your collection ``Sessions``.
            
            #. Create a second collection.

               Click :icon-fa4:`plus-square` next to the default name 
               ``VirtualDatabase0`` to add a collection to the database. 
               For this tutorial, name your new collection ``Users``.
            
            #. Add data to your virtual database.

               Drag and drop the following data sources into the 
               respective {+fdi+} virtual collections:

               - ``/mflix/sessions.json``, into the ``Sessions`` 
                 collection, and
               - ``/mflix/users.json`` into the ``Users`` collection.

         #. Click :guilabel:`Save`.

            Your {+fdi+} appears on the :guilabel:`Data Federation` page.

         To learn more about configuring {+adf+} with real data stores, see 
         :ref:`config-adf`.

         Connect to Your {+FDI+}
         ---------------------------------------------

         To connect to your {+fdi+} and query sample data or your own data with 
         {+asql+}, see :ref:`Connect <sql-connect>`.

         For a tutorial on connecting with free tools, 
         see :ref:`sql-connect-tutorial`.
