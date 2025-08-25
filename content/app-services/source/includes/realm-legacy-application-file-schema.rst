.. code-block:: none

   yourRealmApp/
   ├── config.json
   ├── secrets.json
   ├── auth_providers/
   │   └── <provider name>.json
   ├── functions/
   │   └── <function name>/
   │       ├── config.json
   │       └── source.js
   ├── services/
   │   └── <service name>/
   │       ├── config.json
   │       ├── incoming_webhooks/
   │       │   ├── config.json
   │       │   └── source.js
   │       └── rules/
   │           └── <rule name>.json
   ├── triggers/
   │   └── <trigger name>.json
   ├── hosting/
   │   ├── metadata.json
   │   └── files/
   │       └── <files to host>
   └── values/
       └── <value name>.json
