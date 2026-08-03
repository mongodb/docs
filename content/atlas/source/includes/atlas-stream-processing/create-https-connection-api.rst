Add an HTTPS Connection through the {+atlas-admin-api+}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The {+atlas-admin-api+} provides an endpoint for adding a
connection to a connection registry.

:oas-bump-atlas-op:`Create One Connection <creategroupstreamconnection>`

When you create an HTTPS connection through the {+atlas-admin-api+},
you work with two distinct sets of headers:

- **Request headers** are headers that establish the
  {+atlas-admin-api+} request itself. Send these with the ``curl``
  command using the ``--header`` flag.

- **HTTPS connection headers** are optional runtime headers that
  {+atlas-sp+} sends to your external endpoint. Define these in the
  ``headers`` field of the connection body. If your endpoint requires
  authentication, include those credentials as connection headers.

**Example:**

The following example creates an HTTPS connection with both
{+atlas-admin-api+} request headers and HTTPS connection headers:

.. code-block:: sh

   curl --user "<publicApiKey>:<privateApiKey>" --digest \
     --header "Content-Type: application/json" \
     --header "Accept: application/vnd.atlas.2023-02-01+json" \
     --include \
     --data '{
       "name": "HTTPSConnection",
       "type": "Https",
       "url": "<apiBasePath>",
       "headers": {
         "Content-Type": "application/json",
         "Authorization": "Bearer <accessToken>"
       }
     }' \
     --request POST "https://cloud.mongodb.com/api/atlas/v2/groups/<projectID>/streams/<tenantName>/connections"

.. include:: /includes/atlas-stream-processing/https-stage-support.rst

To learn how to use HTTPS connections with {+atlas-sp+}, see
:ref:`<atlas-sp-agg-https>`.
