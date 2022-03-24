# E2E Test Inventory

#### Fields Description

- Command: the MongoDB CLI command without `mongocli atlas|om|cm` 
- E2E Atlas:    
    -  Possible values: `('Y'|'N')`
    -  Indicates if an e2e test for the command is present `('Y')` or not present `('N')` for Atlas
- E2E OM:    
    -  Possible values: `('Y'|'N')`
    -  Indicates if an e2e test for the command is present `('Y')` or not present `('N')` for Ops Manager
- E2E CM:    
    -  Possible values: `('Y'|'N')`
    -  Indicates if an e2e test for the command is present `('Y')` or not present `('N')` for Cloud Manager
 - Atlas:  
     -  Possible values: `('Y'|'N'|' ')`
     -  Indicates if the command supports `('Y')` or not support `('N'|' ')` Atlas
 - OM:    
     -  Possible values: `('Y'|'N'|' ')`
     -  Indicates if the command supports `('Y')` or not support `('N'|' ')` Ops Manager
 - CM:    
     -  Possible values: `('Y'|'N'|' ')`
     -  Indicates if the command supports `('Y')` or not support `('N'|' ')` Cloud Manager


#### Inventory

Command                                         | E2E Atlas | E2E OM    | E2E CM    | Atlas     | OM    | CM    |
| :---                                          | :---:     | :---:     | :---:     | :---:     | :---: | :---: |
| `alerts config create`                        | Y         | N         | N         | Y         | Y     | Y     |
| `alerts config delete`                        | Y         | N         | N         | Y         | Y     | Y     |
| `alerts config fields type`                   | Y         | N         | N         | Y         | Y     | Y     |
| `alerts config list`                          | Y         | N         | N         | Y         | Y     | Y     |
| `alerts acknowledge`                          | Y         | N         | Y         | Y         | Y     | Y     |
| `alerts unacknowledge`                        | Y         | N         | Y         | Y         | Y     | Y     |
| `alerts list`                                 | Y         | N         | Y         | Y         | Y     | Y     |
| `alerts describe`                             | Y         | N         | Y         | Y         | Y     | Y     |
| `alerts global list`                          |           | N         |           |           | Y     |       |
| `accessList create`                           | Y         |           |           | Y         |       |       |
| `accessList delete`                           | Y         |           |           | Y         |       |       |
| `accessList list`                             | Y         |           |           | Y         |       |       |
| `backup snapshots create`                     | N         |           |           | Y         |       |       |
| `backup snapshots delete`                     | N         |           |           | Y         |       |       |
| `backup snapshots describe`                   | N         |           |           | Y         |       |       |
| `backup snapshots watch`                      | N         |           |           | Y         |       |       |
| `backup restore list`                         | N         |           |           | Y         |       |       |
| `backup restore start`                        | N         |           |           | Y         |       |       |
| `cloudProvider aws accessRoles authorize`     | N         |           |           | Y         |       |       |
| `cloudProvider aws accessRoles deauthorize`   | N         |           |           | Y         |       |       |
| `cloudProvider aws accessRoles create`        | Y         |           |           | Y         |       |       |
| `cloudProvider accessRoles list`              | Y         |           |           | Y         |       |       |
| `cluster connectionString describe`           | Y         |           |           | Y         |       |       |
| `cluster index create`                        | Y         |           |           | Y         |       |       |
| `cluster create`                              | Y         |           |           | Y         |       |       |
| `cluster delete`                              | Y         |           |           | Y         |       |       |
| `cluster describe`                            | Y         |           |           | Y         |       |       |
| `cluster list`                                | Y         |           |           | Y         |       |       |
| `cluster start`                               | N         |           |           | Y         |       |       |
| `cluster pause`                               | N         |           |           | Y         |       |       |
| `cluster update`                              | Y         |           |           | Y         |       |       |
| `cluster watch`                               | Y         |           |           | Y         |       |       |
| `cluster onlineArchive create`                | Y         |           |           | Y         | N     | N     |
| `cluster onlineArchive delete`                | Y         |           |           | Y         | N     | N     |
| `cluster onlineArchive describe`              | Y         |           |           | Y         | N     | N     |
| `cluster onlineArchive list`                  | Y         |           |           | Y         | N     | N     |
| `cluster onlineArchive pause`                 | Y         |           |           | Y         | N     | N     |
| `cluster onlineArchive start`                 | Y         |           |           | Y         | N     | N     |
| `cluster onlineArchive update`                | Y         |           |           | Y         | N     | N     |
| `cluster search index create`                 | Y         |           |           | Y         | N     | N     |
| `cluster search index delete`                 | Y         |           |           | Y         | N     | N     |
| `cluster search index describe`               | Y         |           |           | Y         | N     | N     |
| `cluster search index list`                   | Y         |           |           | Y         | N     | N     |
| `cluster search index update`                 | Y         |           |           | Y         | N     | N     |
| `dbrole create`                               | Y         |           |           | Y         |       |       |
| `dbrole delete`                               | Y         |           |           | Y         |       |       |
| `dbrole describe`                             | Y         |           |           | Y         |       |       |
| `dbrole list`                                 | Y         |           |           | Y         |       |       |
| `dbrole update`                               | Y         |           |           | Y         |       |       |
| `customDns aws describe`                      | Y         |           |           | Y         |       |       |
| `customDns aws disable`                       | Y         |           |           | Y         |       |       |
| `customDns aws enable`                        | Y         |           |           | Y         |       |       |
| `datalake create`                             | Y         |           |           | Y         |       |       |
| `datalake delete`                             | Y         |           |           | Y         |       |       |
| `datalake describe`                           | Y         |           |           | Y         |       |       |
| `datalake list`                               | Y         |           |           | Y         |       |       |
| `datalake update`                             | Y         |           |           | Y         |       |       |
| `dbuser certs create`                         | Y         |           |           | Y         |       |       |
| `dbuser certs list`                           | Y         |           |           | Y         |       |       |
| `dbuser create`                               | Y         |           |           | Y         |       |       |
| `dbuser delete`                               | Y         |           |           | Y         |       |       |
| `dbuser describe`                             | Y         |           |           | Y         |       |       |
| `dbuser list`                                 | Y         |           |           | Y         |       |       |
| `dbuser update`                               | Y         |           |           | Y         |       |       |
| `integration create DATADOG`                  | Y         |           |           | Y         |       |       |
| `integration create FLOWDOCK`                 | Y         |           |           | Y         |       |       |
| `integration create NEW_RELIC`                | Y         |           |           | Y         |       |       |
| `integration create OPS_GENIE`                | Y         |           |           | Y         |       |       |
| `integration create PAGER_DUTY`               | Y         |           |           | Y         |       |       |
| `integration create VICTOR_OPS`               | Y         |           |           | Y         |       |       |
| `integration create WEBHOOK`                  | Y         |           |           | Y         |       |       |
| `integration create VICTOR_OPS`               | Y         |           |           | Y         |       |       |
| `integration create VICTOR_OPS`               | Y         |           |           | Y         |       |       |
| `integration delete`                          | Y         |           |           | Y         |       |       |
| `integration describe`                        | Y         |           |           | Y         |       |       |
| `integration list`                            | Y         |           |           | Y         |       |       |
| `logs download`                               | Y         |           |           | Y         |       |       |
| `accesslogs list`                             | Y         |           |           | Y         |       |       |
| `maintenanceWindow clear`                     | Y         |           |           | Y         |       |       |
| `maintenanceWindow defer`                     | N         |           |           | Y         |       |       |
| `maintenanceWindow describe`                  | Y         |           |           | Y         |       |       |
| `maintenanceWindow update`                    | Y         |           |           | Y         |       |       |
| `metric database describe`                    | Y         |           |           | Y         |       |       |
| `metric database list`                        | N         |           |           | Y         |       |       |
| `metric disk describe`                        | Y         |           |           | Y         |       |       |
| `metric disk list`                            | N         |           |           | Y         |       |       |
| `metric processes`                            | Y         |           |           | Y         |       |       |
| `networking container delete`                 | N         |           |           | Y         |       |       |
| `networking container list`                   | N         |           |           | Y         |       |       |
| `networking peering create aws`               | N         |           |           | Y         |       |       |
| `networking peering create azure`             | N         |           |           | Y         |       |       |
| `networking peering create gcp`               | N         |           |           | Y         |       |       |
| `networking peering delete`                   | N         |           |           | Y         |       |       |
| `networking peering list`                     | N         |           |           | Y         |       |       |
| `networking peering watch`                    | N         |           |           | Y         |       |       |
| `privateEndpoint aws interface create`        | N         |           |           | Y         |       |       |
| `privateEndpoint aws interface delete`        | N         |           |           | Y         |       |       |
| `privateEndpoint aws interface describe`      | N         |           |           | Y         |       |       |
| `privateEndpoint aws  create`                 | Y         |           |           | Y         |       |       |
| `privateEndpoint aws  delete`                 | Y         |           |           | Y         |       |       |
| `privateEndpoint aws  describe`               | Y         |           |           | Y         |       |       |
| `privateEndpoint aws  list`                   | Y         |           |           | Y         |       |       |
| `privateEndpoint aws  watch`                  | Y         |           |           | Y         |       |       |
| `privateEndpoint azure interface create`      | N         |           |           | Y         |       |       |
| `privateEndpoint azure interface delete`      | N         |           |           | Y         |       |       |
| `privateEndpoint azure interface describe`    | N         |           |           | Y         |       |       |
| `privateEndpoint azure  create`               | Y         |           |           | Y         |       |       |
| `privateEndpoint azure  delete`               | Y         |           |           | Y         |       |       |
| `privateEndpoint azure  describe`             | Y         |           |           | Y         |       |       |
| `privateEndpoint azure  list`                 | Y         |           |           | Y         |       |       |
| `privateEndpoint azure  watch`                | Y         |           |           | Y         |       |       |
| `privateEndpoint gcp create`                  | Y         |           |           | Y         |       |       |
| `privateEndpoint gcp delete`                  | Y         |           |           | Y         |       |       |
| `privateEndpoint gcp list`                    | Y         |           |           | Y         |       |       |
| `privateEndpoint gcp descibe`                 | Y         |           |           | Y         |       |       |
| `privateEndpoint gcp watch`                   | Y         |           |           | Y         |       |       |
| `privateEndpoint dataLake aws create`         | Y         |           |           | Y         |       |       |
| `privateEndpoint dataLake aws list`           | Y         |           |           | Y         |       |       |
| `privateEndpoint dataLake aws delete`         | Y         |           |           | Y         |       |       |
| `privateEndpoint dataLake aws describe`       | Y         |           |           | Y         |       |       |
| `privateEndpoint interface create`            | N         |           |           | Y         |       |       |
| `privateEndpoint interface delete`            | N         |           |           | Y         |       |       |
| `privateEndpoint interface describe`          | N         |           |           | Y         |       |       |
| `privateEndpoint regionalMode describe`       | Y         |           |           | Y         |       |       |
| `privateEndpoint regionalMode enable`         | Y         |           |           | Y         |       |       |
| `privateEndpoint regionalMode disable`        | Y         |           |           | Y         |       |       |
| `process list`                                | Y         |           |           | Y         |       |       |
| `quickstart`                                  | N         |           |           | Y         |       |       |
| `security customercert create`                | N         |           |           | Y         |       |       |
| `security customercert disable`               | N         |           |           | Y         |       |       |
| `security customercert describe`              | N         |           |           | Y         |       |       |
| `security ldap delete`                        | Y         |           |           | Y         |       |       |
| `security ldap describe`                      | Y         |           |           | Y         |       |       |
| `security ldap save`                          | Y         |           |           | Y         |       |       |
| `security ldap status`                        | Y         |           |           | Y         |       |       |
| `security ldap verify`                        | Y         |           |           | Y         |       |       |
| `security ldap watch`                         | Y         |           |           | Y         |       |       |
| `config`                                      |           |           |           |           |       |       |
| `completion`                                  | Y         | Y         | Y         | Y         | Y     | Y     |
| `config delete`                               | Y         | Y         | Y         | Y         | Y     | Y     |
| `config list`                                 | Y         | Y         | Y         | Y         | Y     | Y     |
| `config describe`                             | Y         | Y         | Y         | Y         | Y     | Y     |
| `config rename`                               | Y         | Y         | Y         | Y         | Y     | Y     |
| `config set`                                  |           |           |           |           |       |       |
| `event list`                                  | Y         | N         |Y          | Y         | Y     | Y     |
| `iam globalAccessList create`                 |           | N         |           |           | Y     |       |
| `iam globalAccessList delete`                 |           | N         |           |           | Y     |       |
| `iam globalAccessList describe`               |           | N         |           |           | Y     |       |
| `iam globalAccessList list`                   |           | N         |           |           | Y     |       |
| `iam globalApiKey create`                     |           | N         |           |           | Y     |       |
| `iam globalApiKey delete`                     |           | N         |           |           | Y     |       |
| `iam globalApiKey describe`                   |           | N         |           |           | Y     |       |
| `iam globalApiKey list`                       |           | N         |           |           | Y     |       |
| `iam globalApiKey update`                     |           | N         |           |           | Y     |       |
| `iam orgs apiKey accessList create`           | Y         | Y         | Y         | Y         | Y     | Y     |
| `iam orgs apiKey accessList delete`           | Y         | Y         | Y         | Y         | Y     | Y     |
| `iam orgs apiKey accessList list`             | Y         | Y         | Y         | Y         | Y     | Y     |
| `iam orgs apiKey  create`                     | Y         | Y         | Y         | Y         | Y     | Y     |
| `iam orgs apiKey  delete`                     | Y         | Y         | Y         | Y         | Y     | Y     |
| `iam orgs apiKey  describe`                   | Y         | Y         | Y         | Y         | Y     | Y     |
| `iam orgs apiKey  list`                       | Y         | Y         | Y         | Y         | Y     | Y     |
| `iam orgs apiKey  update`                     | Y         | Y         | Y         | Y         | Y     | Y     |
| `iam orgs users  list`                        | N         | N         | N         | Y         | Y     | Y     |
| `iam orgs create`                             |           | Y         | N         |           | Y     | Y     |
| `iam orgs delete`                             | N         | Y         | N         | Y         | Y     | Y     |
| `iam orgs describe`                           | Y         | Y         | N         | Y         | Y     | Y     |
| `iam orgs list`                               | Y         | Y         | N         | Y         | Y     | Y     |
| `iam orgs invitations list`                   | Y         | Y         | N         | Y         | N     | N     |
| `iam orgs invitations describe`               | Y         | Y         | N         | Y         | N     | N     |
| `iam orgs invitations invite`                 | Y         | Y         | N         | Y         | N     | N     |
| `iam orgs invitations update`                 | Y         | Y         | N         | Y         | N     | N     |
| `iam orgs invitations delete`                 | Y         | Y         | N         | Y         | N     | N     |
| `iam project apiKey create`                   | Y         | N         | Y         | Y         | Y     | Y     |
| `iam project apiKey delete`                   | Y         | N         | Y         | Y         | Y     | Y     |
| `iam project apiKey describe`                 | N         | N         | N         | Y         | Y     | Y     |
| `iam project apiKey list`                     | Y         | N         | Y         | Y         | Y     | Y     |
| `iam project apiKey assign`                   | Y         | N         | Y         | Y         | Y     | Y     |
| `iam project users list`                      | Y         | N         | Y         | Y         | Y     | Y     |
| `iam project users delete`                    | N         | N         | N         | Y         | Y     | Y     |
| `iam project team add`                        | N         | N         | N         | Y         | Y     | Y     |
| `iam project team delete`                     | N         | N         | N         | Y         | Y     | Y     |
| `iam project team list`                       | N         | N         | N         | Y         | Y     | Y     |
| `iam project team update`                     | N         | N         | N         | Y         | Y     | Y     |
| `iam project create`                          | Y         | Y         | Y         | Y         | Y     | Y     |
| `iam project delete`                          | N         | Y         | N         | Y         | Y     | Y     |
| `iam project describe`                        | N         | Y         | N         | Y         | Y     | Y     |
| `iam project list`                            | N         | Y         | N         | Y         | Y     | Y     |
| `iam project invitations list`                | Y         | Y         | N         | Y         | N     | N     |
| `iam project invitations describe`            | Y         | Y         | N         | Y         | N     | N     |
| `iam project invitations invite`              | Y         | Y         | N         | Y         | N     | N     |
| `iam project invitations update`              | Y         | Y         | N         | Y         | N     | N     |
| `iam project invitations delete`              | Y         | Y         | N         | Y         | N     | N     |
| `iam team user add`                           | Y         | N         | Y         | Y         | Y     | Y     |
| `iam team user delete`                        | Y         | N         | Y         | Y         | Y     | Y     |
| `iam team user list`                          | Y         | N         | Y         | Y         | Y     | Y     |
| `iam team create`                             | Y         | N         | Y         | Y         | Y     | Y     |
| `iam team delete`                             | Y         | N         | Y         | Y         | Y     | Y     |
| `iam team describe`                           | Y         | N         | Y         | Y         | Y     | Y     |
| `iam team list`                               | Y         | N         | Y         | Y         | Y     | Y     |
| `iam user invite`                             | N         | N         | N         | Y         | Y     | Y     |
| `iam user delete`                             | N         | N         | N         | Y         | Y     | Y     |
| `iam user describe`                           | Y         | N         | Y         | Y         | Y     | Y     |
| `admin backup blockstore create`              |           | N         |           |           | N     |       |
| `admin backup blockstore delete`              |           | N         |           |           | N     |       |
| `admin backup blockstore describe`            |           | N         |           |           | N     |       |
| `admin backup blockstore list`                |           | N         |           |           | N     |       |
| `admin backup blockstore update`              |           | N         |           |           | N     |       |
| `admin backup fileSystem create`              |           | N         |           |           | N     |       |
| `admin backup fileSystem delete`              |           | N         |           |           | N     |       |
| `admin backup fileSystem describe`            |           | N         |           |           | N     |       |
| `admin backup fileSystem list`                |           | N         |           |           | N     |       |
| `admin backup fileSystem update`              |           | N         |           |           | N     |       |
| `admin backup oplog create`                   |           | N         |           |           | N     |       |
| `admin backup oplog delete`                   |           | N         |           |           | N     |       |
| `admin backup oplog describe`                 |           | N         |           |           | N     |       |
| `admin backup oplog list`                     |           | N         |           |           | N     |       |
| `admin backup oplog update`                   |           | N         |           |           | N     |       |
| `admin backup s3 create`                      |           | N         |           |           | N     |       |
| `admin backup s3 delete`                      |           | N         |           |           | N     |       |
| `admin backup s3 describe`                    |           | N         |           |           | N     |       |
| `admin backup s3 list`                        |           | N         |           |           | N     |       |
| `admin backup s3 update`                      |           | N         |           |           | N     |       |
| `admin backup sync create`                    |           | N         |           |           | N     |       |
| `admin backup sync delete`                    |           | N         |           |           | N     |       |
| `admin backup sync describe`                  |           | N         |           |           | N     |       |
| `admin backup sync list`                      |           | N         |           |           | N     |       |
| `admin backup sync update`                    |           | N         |           |           | N     |       |
| `agent apikeys create`                        |           | N         | N         |           | Y     | Y     |
| `agent apikeys delete`                        |           | N         | N         |           | Y     | Y     |
| `agent apikeys list`                          |           | Y         | Y         |           | Y     | Y     |
| `agent version list`                          |           | Y         | Y         |           | Y     | Y     |
| `agent list`                                  |           | Y         | Y         |           | Y     | Y     |
| `agent upgrade`                               |           | Y         | Y         |           | Y     | Y     |
| `automation describe`                         |           | N         | N         |           | Y     | Y     |
| `automation status`                           |           | N         | N         |           | Y     | Y     |
| `automation update`                           |           | N         | N         |           | Y     | Y     |
| `automation watch`                            |           | N         | N         |           | Y     | Y     |
| `backup config describe`                      |           | N         | N         |           | Y     | Y     |
| `backup config list`                          |           | N         | N         |           | Y     | Y     |
| `backup config update`                        |           | N         | N         |           | Y     | Y     |
| `backup snapshots schedule describe`          |           | N         | N         |           | Y     | Y     |
| `backup snapshots schedule update`            |           | N         | N         |           | Y     | Y     |
| `backup snapshots list`                       |           | N         | N         |           | Y     | Y     |
| `backup checkpoint list`                      |           | N         | N         |           | Y     | Y     |
| `backup restore start`                        | N         | N         | N         | Y         | Y     | Y     |
| `backup restore list`                         | N         | N         | N         | Y         | Y     | Y     |
| `backup  enable`                              |           | N         | N         |           | Y     | Y     |
| `backup  disable`                             |           | N         | Y         |           | Y     | Y     |
| `cluster  apply`                              |           | Y         | Y         |           | Y     | Y     |
| `cluster  create`                             |           | Y         | Y         |           | Y     | Y     |
| `cluster  delete`                             |           | Y         | Y         |           | Y     | Y     |
| `cluster  describe`                           |           | Y         | Y         |           | Y     | Y     |
| `cluster  list`                               |           | Y         | Y         |           | Y     | Y     |
| `cluster  restart`                            |           | Y         | Y         |           | Y     | Y     |
| `cluster  shutdown`                           |           | Y         | Y         |           | Y     | Y     |
| `cluster  startup`                            |           | N         | N         |           | Y     | Y     |
| `cluster  unmanage`                           |           | Y         | Y         |           | Y     | Y     |
| `cluster  update`                             |           | N         | N         |           | Y     | Y     |
| `cluster  reclaimFreeSpace`                   |           | Y         | Y         |           | Y     | Y     |
| `cluster  index create`                       |           | N         | N         |           | Y     | Y     |
| `dbuser create`                               |           | N         | Y         |           | Y     | Y     |
| `dbuser delete`                               |           | N         | Y         |           | Y     | Y     |
| `dbuser list`                                 |           | N         | Y         |           | Y     | Y     |
| `diagnose-archive download`                   |           | N         | N         |           | Y     | Y     |
| `featurePolicy list`                          |           | Y         | Y         |           | Y     | Y     |
| `featurePolicy update`                        |           | Y         | Y         |           | Y     | Y     |
| `logs jobs collect`                           |           | N         | N         |           | Y     | Y     |
| `logs jobs download`                          |           | N         | N         |           | Y     | Y     |
| `logs jobs delete`                            |           | N         | N         |           | Y     | Y     |
| `logs jobs list`                              |           | N         | N         |           | Y     | Y     |
| `maintenanceWindows create`                   |           | Y         | Y         |           | Y     | Y     |
| `maintenanceWindows delete`                   |           | Y         | Y         |           | Y     | Y     |
| `maintenanceWindows list`                     |           | Y         | Y         |           | Y     | Y     |
| `maintenanceWindows update`                   |           | Y         | Y         |           | Y     | Y     |
| `database describe`                           |           | N         | N         |           | Y     | Y     |
| `database list`                               |           | N         | N         |           | Y     | Y     |
| `disk describe`                               |           | N         | N         |           | Y     | Y     |
| `disk list`                                   |           | N         | N         |           | Y     | Y     |
| `process`                                     |           | N         | N         |           | Y     | Y     |
| `process describe`                            |           | N         | N         |           | Y     | Y     |
| `process list`                                |           | N         | N         |           | Y     | Y     |
| `security enable`                             |           | Y         | Y         |           | Y     | Y     |
| `monitoring enable`                           |           | Y         | Y         |           | Y     | Y     |
| `monitoring disable`                          |           | Y         | Y         |           | Y     | Y     |
| `monitoring stop`                             |           | Y         | Y         |           | Y     | Y     |
| `owner create`                                |           | Y         |           |           | Y     |       |
| `server list`                                 |           | Y         | Y         |           | Y     | Y     |
| `softwareComponent list`                      |           | N         | N         |           | Y     | Y     |
| `versionManifest update`                      |           | N         |           |           | Y     |       |
| `serverUsage orgs hosts list`                 |           | N         |           |           | Y     |       |
| `serverUsage orgs serverType get`             |           | N         |           |           | Y     |       |
| `serverUsage orgs serverType set`             |           | N         |           |           | Y     |       |
| `serverUsage project hosts list`              |           | N         |           |           | Y     |       |
| `serverUsage project serverType get`          |           | N         |           |           | Y     |       |
| `serverUsage projet serverType set`           |           | N         |           |           | Y     |       |
| `serverUsage capture`                         |           | N         |           |           | Y     |       |
| `serverUsage download`                        |           | N         |           |           | Y     |       |
| `performanceAdvisor namespace list`           | Y         | N         | N         | Y         | Y     | Y     |
| `performanceAdvisor slowQueryLogs list`       | Y         | N         | N         | Y         | Y     | Y     |
| `performanceAdvisor suggestedIndexes list`    | Y         | N         | N         | Y         | Y     | Y     |
| `performanceAdvisor slowOT enable`            | Y         |           |           | Y         | N     | N     |
| `performanceAdvisor slowOT disable`           | Y         |           |           | Y         | N     | N     |
| `serverless create`                           | Y         |           |           | Y         |       |       |
| `serverless delete`                           | Y         |           |           | Y         |       |       |
| `serverless describe`                         | Y         |           |           | Y         |       |       |
| `serverless list`                             | Y         |           |           | Y         |       |       |
| `serverless watch`                            | Y         |           |           | Y         |       |       |
| `livemigrations link create`                  | Y         |           |           | Y         | N     | N     |
| `livemigrations link delete`                  | Y         |           |           | Y         | Y     | Y     |
| `livemigrations validation create`            |           |           |           | Y         |       |       |
| `livemigrations create`                       |           |           |           | Y         |       |       |
| `livemigrations cutover`                      | N         |           |           | Y         | N     | N     |
