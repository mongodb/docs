.. step:: Connect from Power BI Desktop.

   1. Open Power BI Desktop.

   2. Select :guilabel:`Get data` from the :guilabel:`Home` menu.

   3. Find and select the :guilabel:`MongoDB Atlas SQL` connector.

      i. Type ``mongo`` in the search bar to find the new connector.
      #. Select :guilabel:`MongoDB Atlas SQL`.
      #. Click :guilabel:`Connect`.

   4. Enter the URI and the database name and click :guilabel:`OK`.

      The :guilabel:`MongoDB URI` is the URL is the from the previous step.

      You can also enter a SQL query in the :guilabel:`Native query` field. Power BI
      uses the SQL query as the direct source for the data.

   5. Enter your Atlas :guilabel:`User name` and :guilabel:`Password` and click :guilabel:`Connect`.

      By default, a user can access all {+clusters+} and {+fdi+}s in projects to which
      they have access. If you restricted access to specific {+clusters+} and {+fdi+}s,
      you can grant access to the new {+fdi+} in the Edit User menu. To learn more, see
      :ref:`Configure Database Users <modify-mongodb-users>`.

.. step:: Power BI Service Configuration

   1. Ensure you have a Microsoft subscription for Power BI Service.

   2. Download and install the MS On-premises data gateway.

   3. Open the gateway, sign in to your Power BI account, and verify
      it's "online and ready to be used".
         
      .. note::
         You may need to restart the gateway via :guilabel:`Service Settings`.

   4. From Power BI Desktop, publish your created report to Power BI Service.

   5. In Power BI Service, verify your gateway is available and
      online in "Manage connections and gateways".

   6. To set up scheduled data refreshes, navigate to your Power BI Service
      workspace menu and configure the semantic model connection settings,
      including "Gateway connection" and "Data Source Credentials" with your
      authentication credentials for your MongoDB database.


   7. Return to the Power BI workspace and refresh the semantic model to ensure the
      on-premises data gateway is working properly.
