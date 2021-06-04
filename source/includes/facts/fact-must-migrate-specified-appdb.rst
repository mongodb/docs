Before upgrading your |k8s-op| to v1.11.0 or later,
migrate the Application Database
of any deployed ``MongoDBOpsManager`` custom resources
to one of the supported enterprise MongoDB editions. You specify the
MongoDB version for the :opsmgr:`Application Database
</core/system-overview/#application-database>` in the required
:opsmgrkube:`spec.applicationDatabase.version` setting.
For the list of supported MongoDB versions, see the
:qr-mdb:`container registry </mongodb-enterprise-appdb-database?tab=tags>`.

You must migrate the Application Database to the latest available
enterprise edition of MongoDB if your ``MongoDBOpsManager`` custom
resource uses:

- A bundled version of MongoDB for the Application Database. In this case,
  the :opsmgrkube:`spec.applicationDatabase.version` setting is not
  specified, or its value is empty.
- Any other enterprise MongoDB version specified in the :opsmgrkube:`spec.applicationDatabase.version` setting.
- Any community edition of MongoDB specified in the :opsmgrkube:`spec.applicationDatabase.version` setting.

