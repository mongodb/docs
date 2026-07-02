.. code-block:: sh

   docker save registry.connect.redhat.com/mongodb/mongodb-kubernetes-operator:{+dl-version+} -o mongodb-kubernetes-operator.tar; \
   docker save registry.connect.redhat.com/mongodb/mongodb-kubernetes-database:{+dl-version+} -o mongodb-enterprise-database.tar; \
   docker save registry.connect.redhat.com/mongodb/mongodb-enterprise-ops-manager:<om-version> -o mongodb-enterprise-ops-manager.tar; \
   docker save registry.connect.redhat.com/mongodb/mongodb-kubernetes-appdb:{+appdb-agent-version+} -o mongodb-kubernetes-appdb.tar; \
   docker save registry.connect.redhat.com/mongodb/mongodb-kubernetes-init-ops-manager:{+dl-version+} -o mongodb-kubernetes-init-ops-manager.tar; \
   docker save registry.connect.redhat.com/mongodb/mongodb-kubernetes-init-appdb:{+dl-version+} -o mongodb-kubernetes-init-appdb.tar;
   docker save registry.connect.redhat.com/mongodb/mongodb-kubernetes-init-database:{+dl-version+} -o mongodb-kubernetes-init-database.tar;