
.. _https-sp-connection-atlas-api:

Add an HTTPS Connection through {+atlas-admin-api+}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The {+atlas-admin-api+} provides an endpoint for adding a 
connection to a connection registry.

:oas-bump-atlas-op:`Create One Connection <creategroupstreamconnection>`

If the API endpoint requires authentication, such as an API key or 
Bearer Access Token authentication, you should add
authentication details as headers when you define the connection to prevent
providing these as plaintext as part of the :pipeline:`$https` operator.

.. important:: 
  
Other authentication schemes, such as Digest Auth or OAuth, are not 
currently supported.

To learn how to use HTTPS connections with {+atlas-sp+}, see :ref:`<atlas-sp-agg-https>`.

**Example:**

.. code-block:: sh

   curl --user "<publicApiKey>:<privateApiKey>" --digest \
     --header "Content-Type: application/json" \
     --header "Accept: application/vnd.atlas.2023-02-01+json" \
     --include \
     --data '{"name": "HTTPSConnection","type": "Https","url": "<apiBasePath>"}' \
     --request POST "https://cloud.mongodb.com/api/atlas/v2/groups/<projectID>/streams/<tenantName>/connections"
