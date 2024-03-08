.. code-block:: sh

   docker save registry.connect.redhat.com/mongodb/mongodb-enterprise-operator:{+dl-version+} -o mongodb-enterprise-operator.tar; \
   docker save registry.connect.redhat.com/mongodb/mongodb-enterprise-database:{+dl-version+} -o mongodb-enterprise-database.tar; \
   docker save registry.connect.redhat.com/mongodb/mongodb-enterprise-ops-manager:<om-version> -o mongodb-enterprise-ops-manager.tar; \
   docker save registry.connect.redhat.com/mongodb/mongodb-enterprise-appdb:{+appdb-agent-version+} -o mongodb-enterprise-appdb.tar; \
   docker save registry.connect.redhat.com/mongodb/mongodb-enterprise-init-ops-manager:{+dl-version+} -o mongodb-enterprise-init-ops-manager.tar; \
   docker save registry.connect.redhat.com/mongodb/mongodb-enterprise-init-appdb:{+dl-version+} -o mongodb-enterprise-init-appdb.tar;
   docker save registry.connect.redhat.com/mongodb/mongodb-enterprise-init-database:{+dl-version+} -o mongodb-enterprise-init-database.tar;