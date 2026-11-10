Add a Data Catalog Connection through the {+atlas-admin-api+}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To add a data catalog connection to your {+spw+} through the
{+atlas-admin-api+}, follow these steps:

.. procedure::
   :style: normal

   .. step:: Gather your catalog credentials.

      To set up your catalog and create these credentials, see
      :ref:`atlas-sp-iceberg-catalogs`.

      - For a Databricks Unity catalog, note the client ID and client
        secret of your Databricks service principal.
      - For a Snowflake Horizon catalog, note your Snowflake account
        identifier, service user, and role. Locate the private key of
        the key pair for the service user.

   .. step:: Configure a Service Account.

      .. include:: /includes/atlas-stream-processing/create-service-account.rst

   .. step:: Create the data catalog connection.

      .. include:: /includes/atlas-stream-processing/service-account-request.rst

      Set the following key-value pairs for all data catalog
      connections:

      .. list-table::
         :widths: 35 65
         :header-rows: 1

         * - Key
           - Value

         * - ``type``
           - ``"DataCatalog"``

         * - ``catalogProvider``
           - ``"DATABRICKS_UNITY"`` or ``"SNOWFLAKE_HORIZON"``. You
             can't change this value after you create the connection.

         * - ``catalogUrl``
           - HTTPS URL of your catalog. For Databricks Unity, use your
             workspace URL on ``cloud.databricks.com`` or
             ``azuredatabricks.net``. For Snowflake Horizon, use your
             account URL on ``snowflakecomputing.com``.

      For a Databricks Unity connection, also set the following
      key-value pairs:

      .. list-table::
         :widths: 35 65
         :header-rows: 1

         * - Key
           - Value

         * - ``databricks.authentication.clientId``
           - Client ID of your Databricks service principal.

         * - ``databricks.authentication.clientSecret``
           - Client secret of your Databricks service principal.

      For a Snowflake Horizon connection, also set the following
      key-value pairs:

      .. list-table::
         :widths: 35 65
         :header-rows: 1

         * - Key
           - Value

         * - ``snowflake.authentication.account``
           - Snowflake account identifier.

         * - ``snowflake.authentication.user``
           - Snowflake service user.

         * - ``snowflake.authentication.role``
           - Snowflake role that the service user assumes.

         * - ``snowflake.authentication.privateKey``
           - Private key of the key pair for the service user.

      The {+atlas-admin-api+} accepts ``clientSecret`` and
      ``privateKey`` only in requests. Responses omit them.

.. include:: /includes/atlas-stream-processing/data-catalog-credential-expiry.rst

.. include:: /includes/atlas-stream-processing/data-catalog-stage-support.rst
