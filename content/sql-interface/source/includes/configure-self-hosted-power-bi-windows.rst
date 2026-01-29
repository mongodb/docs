Set Up On-Premise {+sql-interface+} for Power BI on Windows
-----------------------------------------------------------

.. procedure::
   :style: normal

   .. include:: /includes/schema-builder-windows.rst

   .. step:: Download and Install Your SQL Driver

      Download and install the ODBC MongoDB SQL driver.

      .. list-table::
         :header-rows: 1
         :widths: 20 40 40

         * - Driver Type
           - Compatible Operating Systems
           - Installation Instructions

         * - **ODBC Driver**
           - Windows x86_64
           - :ref:`ODBC Installation Guide <sql-connect-odbc>`

   .. step:: Download and install `the Power Bi connector file <https://www.mongodb.com/try/download/power-bi-connector/>`__.

      .. note::
         The certified MongoDB Power BI Connector ships with Power BI Desktop and can be used for both Atlas and EA database connections.
         If your version of Power BI Desktop already has the MongoDB 
         Atlas SQL connector, you can skip this step. To use a different 
         version than the one bundled with Power BI Desktop, complete 
         this step.
   
      Move the connector file to the following directory path: 
      
      ``C:\Users\<user>\Documents\Power BI Desktop\Custom Connectors``.

      Create this folder if it doesn't already exist.

   .. step:: Connect from Power BI Desktop.

      1. Open Power BI Desktop.

      #. Select :guilabel:`Get data` from the :guilabel:`Home` menu.

      #. Find and select the :guilabel:`MongoDB Atlas SQL` connector.

         a. Type ``mongo`` in the search bar to find the new connector.
         #. Select :guilabel:`MongoDB Atlas SQL`.
         #. Click :guilabel:`Connect`.

      #. Enter the URI and the database name and click :guilabel:`OK`.

         The :guilabel:`MongoDB URI` is the URL is the from the previous step.

         You can also enter a SQL query in the :guilabel:`Native query` field. Power BI
         uses the SQL query as the direct source for the data.

      #. Enter your {+service+} :guilabel:`User name` and :guilabel:`Password` and click :guilabel:`Connect`.

         By default, a user can access all {+clusters+} and {+fdi+}s in projects to which
         they have access. If you restricted access to specific {+clusters+} and {+fdi+}s,
         you can grant access to the new {+fdi+} in the Edit User menu. To learn more, see
         :ref:`Configure Database Users <modify-mongodb-users>`.

   .. step:: Power BI Service Configuration

      2. Ensure you have a Microsoft subscription for Power BI Service.

      #. Download and install the `Microsoft on-premises data gateway <https://learn.microsoft.com/en-us/data-integration/gateway/service-gateway-install>`__.

      #. Open the gateway, sign in to your Power BI account, and verify
         it's "online and ready to be used".
         
         .. note::
            You may need to restart the gateway via :guilabel:`Service Settings`.

      #. From Power BI Desktop, publish your created report to Power BI Service.

      #. In Power BI Service, verify your gateway is available and
         online in :guilabel:`Manage connections and gateways`.

      #. To set up scheduled data refreshes, navigate to your Power BI Service
         workspace menu and configure the semantic model connection settings, 
         including :guilabel:`Gateway connection` and :guilabel:`Data Source Credentials` with your 
         authentication credentials for your MongoDB database.

      #. Return to the Power BI workspace and refresh the semantic model to ensure the
         on-premises data gateway is working properly.
