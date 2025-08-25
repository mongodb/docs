.. code-block:: none

   app/
   ├── root_config.json
   ├── auth/
   │   ├── providers.json
   │   └── custom_user_data.json
   ├── data_sources/
   │   └── <service name>/
   │       ├── config.json
   │       └── <database>/
   │           └── <collection>/
   │               ├── schema.json
   │               └── rules.json
   ├── environments/
   │   ├── no-environment.json
   │   ├── development.json
   │   ├── testing.json
   │   ├── qa.json
   │   └── production.json
   ├── functions/
   │   ├── config.json
   │   ├── <function>.js
   │   └── <directory>/
   │       └── <function>.js
   ├── graphql/
   │   ├── config.json
   │   └── custom_resolvers
   │       └── <resolver name>.json
   ├── hosting/
   │   ├── config.json
   │   ├── metadata.json
   │   └── files/
   │       └── <files to host>
   ├── http_endpoints/
   │   ├── config.json
   │   ├── data_api_config.json
   │   └── [Deprecated] <service name>/
   │       ├── config.json
   │       └── incoming_webhooks/
   │           ├── config.json
   │           └── source.js
   ├── log_forwarders/
   │   └── <name>.json
   ├── sync/
   │   └── config.json
   ├── triggers/
   │   └── <trigger name>.json
   └── values/
       └── <value name>.json
