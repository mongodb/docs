Add a GCP Pub/Sub Connection through the {+atlas-admin-api+}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To add a {+gcp+} Pub/Sub connection to your {+spw+} through the
{+atlas-admin-api+}, follow these steps:

.. procedure::
   :style: normal

   .. step:: Set up GCP Service Account Access

      Follow the procedure described in :ref:`Set Up and Manage GCP
      Service Account Access <manage-gcp-access>`.

      Note the ``Service Account`` ID for later in this procedure.
      
      Ensure that you grant the following roles at both the project and topic levels:

      - `Publisher Role <https://docs.cloud.google.com/pubsub/docs/access-control#pubsub.publisher>`__
      - `Viewer Role <https://docs.cloud.google.com/pubsub/docs/access-control#pubsub.viewer>`__
      
      For more information, see the `Pub/Sub documentation
      <https://docs.cloud.google.com/pubsub/docs/access-control#console>`__.
      
   .. step:: Configure an {+service+} Service Account

      .. include:: /includes/atlas-stream-processing/create-service-account.rst
      
   .. step:: Create the {+gcp+} Pub/Sub connection.

      .. include:: /includes/atlas-stream-processing/service-account-request.rst

      For values specific to a GCP Pub/Sub connection, see
      the `field descriptions <https://www.mongodb.com/docs/api/doc/atlas-admin-api-v2/operation/operation-creategroupstreamconnection#operation-creategroupstreamconnection-body-application-vnd-atlas-2023-02-01-json-gcppubsub-object>`__.
