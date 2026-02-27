.. step:: Connect from Power BI Desktop.

   a. Open Power BI Desktop.

   b. Select :guilabel:`Get data` from the :guilabel:`Home` menu.

   c. Find and select the :guilabel:`MongoDB Atlas SQL` connector.

      i. Type ``mongo`` in the search bar to find the new connector.
      ii. Select :guilabel:`MongoDB Atlas SQL`.
      iii. Click :guilabel:`Connect`.

   d. Enter the URI and the database name and click :guilabel:`OK`.

      The :guilabel:`MongoDB URI` is the URL is the from the previous step.

      You can also enter a SQL query in the :guilabel:`Native query` field. Power BI
      uses the SQL query as the direct source for the data.

   e. Enter your Atlas :guilabel:`User name` and :guilabel:`Password` and click :guilabel:`Connect`.

      By default, a user can access all {+clusters+} and {+fdi+}s in projects to which
      they have access. If you restricted access to specific {+clusters+} and {+fdi+}s,
      you can grant access to the new {+fdi+} in the Edit User menu. To learn more, see
      :ref:`Configure Database Users <modify-mongodb-users>`.

.. step:: Power BI Service Configuration

   a. Ensure you have a Microsoft subscription for Power BI Service.

   b. Download and install the MS On-premises data gateway.

   c. Open the gateway, sign in to your Power BI account, and verify
      it's "online and ready to be used".

      .. note::
         You may need to restart the gateway via :guilabel:`Service Settings`.

   d. From Power BI Desktop, publish your created report to Power BI Service.

   e. In Power BI Service, verify your gateway is available and
      online in "Manage connections and gateways".

   f. To set up scheduled data refreshes, navigate to your Power BI Service
      workspace menu and configure the semantic model connection settings,
      including "Gateway connection" and "Data Source Credentials" with your
      authentication credentials for your MongoDB database.


   g. Return to the Power BI workspace and refresh the semantic model to ensure the
      on-premises data gateway is working properly.
