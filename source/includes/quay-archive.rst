.. code-block:: sh

   docker save quay.io/mongodb/mongodb-enterprise-operator:<op-version> -o mongodb-enterprise-operator.tar; \
   docker save quay.io/mongodb/mongodb-enterprise-database:<db-version> -o mongodb-enterprise-database.tar; \
   docker save quay.io/mongodb/mongodb-enterprise-ops-manager:<om-version> -o mongodb-enterprise-ops-manager.tar; \
   docker save quay.io/mongodb/mongodb-enterprise-appdb:{+appdb-agent-version+} -o mongodb-enterprise-appdb.tar; \
   docker save quay.io/mongodb/mongodb-enterprise-init-ops-manager:{+ops-manager-init-version+} -o mongodb-enterprise-init-ops-manager.tar; \
   docker save quay.io/mongodb/mongodb-enterprise-init-appdb:{+appdb-init-version+} -o mongodb-enterprise-init-appdb.tar;
   docker save quay.io/mongodb/mongodb-enterprise-init-database:{+database-init-version+} -o mongodb-enterprise-init-database.tar;