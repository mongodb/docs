Call the :admin-api-endpoint:`Login <operation/adminLogin>` endpoint with your
:ref:`MongoDB {+atlas-admin-api+} key pair <atlas-admin-api-access>`:

.. code-block:: shell

   curl -X POST \
     https://services.cloud.mongodb.com/api/admin/v3.0/auth/providers/mongodb-cloud/login \
     -H 'Content-Type: application/json' \
     -H 'Accept: application/json' \
     -d '{
       "username": "<Public API Key>",
       "apiKey": "<Private API Key>"
     }'

If authentication succeeds, the response body contains a JSON object
with an ``access_token`` value:

.. code-block:: json
   :emphasize-lines: 2

   {
     "access_token": "<access_token>",
     "refresh_token": "<refresh_token>",
     "user_id": "<user_id>",
     "device_id": "<device_id>"
   }

The ``access_token`` grants access to the App Services Admin API. You
must include it as a Bearer token in the ``Authorization`` header for
all App Services Admin API requests.

.. seealso::

   :admin-api-endpoint:`App Services Admin API Authentication
   <section/Get-Authentication-Tokens>` documentation
