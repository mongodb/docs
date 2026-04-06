Add an Azure Blob Storage Connection through the {+atlas-admin-api+}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To add an |azure| Blob Storage connection to your {+spw+} through the
{+atlas-admin-api+}, follow these steps:

.. procedure::
   :style: normal

   .. step:: Set up Azure Service Principal Access

      Follow the procedure described in :ref:`Set Up and Manage Azure
      Service Principal Access <manage-azure-access>`.

      Ensure that you grant the following permissions:

      - ``Storage Blob Data Contributor`` for your storage account
      - ``Storage Blob Data Contributor`` for your blob storage
	containers
      - ``Reader`` permissions for the Azure Subscription containing
	both the storage account and blob containers.

      Note the ``Service Principal ID`` you used for later in this procedure.

   .. step:: Configure a Service Account

      .. include:: /includes/atlas-stream-processing/create-service-account.rst

   .. step:: Create the |azure| Blob Storage connection.

      .. include:: /includes/atlas-stream-processing/service-account-request.rst

      For values specific to an |azure| Blob Storage connection, see
      the `field descriptions <https://www.mongodb.com/docs/api/doc/atlas-admin-api-v2/operation/operation-creategroupstreamconnection#operation-creategroupstreamconnection-body-application-vnd-atlas-2023-02-01-json-azureblobstorage-object>`__.
