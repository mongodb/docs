.. code-block:: sh

   docker save quay.io/mongodb/mongodb-enterprise-operator-ubi:{+dl-version+} -o mongodb-enterprise-operator.tar; \
   docker save quay.io/mongodb/mongodb-enterprise-database-ubi:{+dl-version+} -o mongodb-enterprise-database.tar; \
   docker save quay.io/mongodb/mongodb-enterprise-ops-manager-ubi:<om-version> -o mongodb-enterprise-ops-manager.tar; \
   docker save quay.io/mongodb/mongodb-enterprise-init-ops-manager-ubi:{+dl-version+} -o mongodb-enterprise-init-ops-manager.tar; \
   docker save quay.io/mongodb/mongodb-enterprise-init-appdb-ubi:{+dl-version+} -o mongodb-enterprise-init-appdb.tar;
   docker save quay.io/mongodb/mongodb-enterprise-init-database-ubi:{+dl-version+} -o mongodb-enterprise-init-database.tar;