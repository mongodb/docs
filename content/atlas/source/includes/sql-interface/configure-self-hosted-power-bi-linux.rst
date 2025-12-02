Set Up On-Premise SQL Interface for Power BI on Linux
-------------------------------------------------------

.. procedure::
   :style: normal

   .. step:: Install & Run the Schema Builder

      1. Download the `Schema Manager <https://www.mongodb.com/try/download/sql-schema-builder>`__.
      2. Move the downloaded file to a directory of your choice.
      3. Rename the downloaded file to ``mongodb-schema-manager``.
      4. Make the schema manager executable by running the following 
         terminal command from the directory where you placed the file.
   
         .. code-block:: bash

            chmod +x mongodb-schema-manager

      5. Run the Schema Manager using a terminal command with your MongoDB URI 
         like the example below. This command generates or regenerates the 
         schema for your collections within the database.

         .. code-block:: bash

            ./mongodb-schema-manager --uri 'mongodb://<db_username>:<db_password>@<host>:<port>/<database>?authSource=admin'

      6. Verify the created SQL schema by looking for the ``__sql_schemas`` collection
         in your database. Inside this collection, there will be a document for each
         collection with its schema map and data type assignments.

   .. step:: Download and Install Your SQL Driver

      1. Download and install either the JDBC or ODBC MongoDB SQL driver.

         .. list-table::
            :header-rows: 1
            :widths: 20 40 40

            * - Driver Type
              - Compatible Operating Systems
              - Installation Instructions

            * - **ODBC Driver**
              - Linux x86_64
              - :ref:`ODBC Installation Guide <sql-connect-odbc>`

   .. step:: Download and install `the Power Bi connector file <https://www.mongodb.com/try/download/power-bi-connector/>`__.

      .. note::
         The certified MongoDB Power BI Connector ships with Power BI Desktop and can be used for both Atlas and EA database connections.
         If your version of Power BI Desktop already has the MongoDB 
         Atlas SQL connector, you can skip this step. To use a different 
         version than the one bundled with Power BI Desktop, complete 
         this step.

      Move the connector file to the following directory path:

      ``/Users/<user>/Documents/Power BI Desktop/Custom Connectors``.

      Create this folder if it doesn't already exist.

   .. step:: Connect from Power BI Desktop.

      2. Open Power BI Desktop.

      3. Select :guilabel:`Get data` from the :guilabel:`Home` menu.

      4. Find and select the :guilabel:`MongoDB Atlas SQL` connector.

         i. Type ``mongo`` in the search bar to find the new connector.
         #. Select :guilabel:`MongoDB Atlas SQL`.
         #. Click :guilabel:`Connect`.

      5. Enter the URI and the database name and click :guilabel:`OK`.

         The :guilabel:`MongoDB URI` is the URL is the from the previous step.

         You can also enter a SQL query in the :guilabel:`Native query` field. Power BI
         uses the SQL query as the direct source for the data.

      6. Enter your Atlas :guilabel:`User name` and :guilabel:`Password` and click :guilabel:`Connect`.

         By default, a user can access all {+clusters+} and {+fdi+}s in projects to which
         they have access. If you restricted access to specific {+clusters+} and {+fdi+}s,
         you can grant access to the new {+fdi+} in the Edit User menu. To learn more, see
         :ref:`Configure Database Users <modify-mongodb-users>`.

   .. step:: Power BI Service Configuration

      7. Ensure you have a Microsoft subscription for Power BI Service.

      8. Download and install the MS On-premises data gateway.

      9. Open the gateway, sign in to your Power BI account, and verify
         it's "online and ready to be used".

         .. note::
            You may need to restart the gateway via :guilabel:`Service Settings`.

      10. From Power BI Desktop, publish your created report to Power BI Service.

      11. In Power BI Service, verify your gateway is available and
         online in "Manage connections and gateways".

      12. To set up scheduled data refreshes, navigate to your Power BI Service 
         workspace menu and configure the semantic model connection settings, 
         including "Gateway connection" and "Data Source Credentials" with your 
         authentication credentials for your MongoDB database.

      13. Return to the Power BI workspace and refresh the semantic model to ensure the
         on-premises data gateway is working properly.
