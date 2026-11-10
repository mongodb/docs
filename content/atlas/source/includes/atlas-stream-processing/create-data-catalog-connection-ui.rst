Add a Data Catalog Connection through {+atlas-ui+}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To add a data catalog connection to your {+spw+} through
{+atlas-ui+}, follow these steps:

.. procedure::
   :style: normal

   .. step:: Set up {+atlas-sp+} permissions.

      Ensure you have at least one of the following roles to manage
      connections:

      - :authrole:`Project Owner`
      - :authrole:`Project Stream Processing Owner`

   .. step:: Gather your catalog credentials.

      To set up your catalog and create these credentials, see
      :ref:`atlas-sp-iceberg-catalogs`.

      - For a Databricks Unity catalog, note the client ID and client
        secret of your Databricks service principal.
      - For a Snowflake Horizon catalog, note your Snowflake account
        identifier, service user, and role. Locate the PEM file of
        the key pair for the service user.

   .. include:: /includes/nav/steps-stream-processing.rst

   .. step:: Go to the :guilabel:`Connection Registry`.

      a. Locate the overview panel of the {+spw+} you want to
         modify and click :guilabel:`Manage`.

      #. Select the :guilabel:`Connection Registry` tab.

   .. step:: Click :guilabel:`+ Add Connection`.

   .. step:: Add a new connection.

      a. Under :guilabel:`Misc`, select a :guilabel:`Data Catalog`
         connection.

      #. Provide a :guilabel:`Connection Name`. Each connection
         name must be unique within a {+spw+}. This is the name
         that you use in the ``catalog.connectionName`` field of the
         ``$iceberg`` stage.

      #. For :guilabel:`Catalog type`, select
         :guilabel:`Databricks Unity` or
         :guilabel:`Snowflake Horizon`.

      #. In the :guilabel:`URL` field, enter the URL of your catalog.
         The URL must use HTTPS and the following domain:

         - For Databricks Unity, your Databricks workspace URL on
           ``cloud.databricks.com`` or ``azuredatabricks.net``.
         - For Snowflake Horizon, your Snowflake account URL on
           ``snowflakecomputing.com``.

      #. Provide the credentials for your catalog type:

         - For Databricks Unity, enter the :guilabel:`Client ID` and
           :guilabel:`Client Secret` of your service principal.
         - For Snowflake Horizon, enter your :guilabel:`Account`,
           :guilabel:`User`, and :guilabel:`Role`. For
           :guilabel:`Private Key`, click :guilabel:`Upload` and
           select the PEM file of your Snowflake key pair.

      #. Click :guilabel:`Add connection`.

.. include:: /includes/atlas-stream-processing/data-catalog-credential-expiry.rst

.. include:: /includes/atlas-stream-processing/data-catalog-stage-support.rst
