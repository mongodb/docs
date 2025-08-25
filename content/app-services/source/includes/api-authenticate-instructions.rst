Call the admin user authentication endpoint with your MongoDB Atlas API
key pair:

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
all Admin API requests.

.. seealso::

   :admin-api-endpoint:`API Authentication Documentation <section/Get-Authentication-Tokens>`
