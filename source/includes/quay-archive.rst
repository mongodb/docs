.. code-block:: sh

   docker save quay.io/mongodb/mongodb-enterprise-operator:{+version+} -o mongodb-enterprise-operator.tar; \
   docker save quay.io/mongodb/mongodb-enterprise-database:{+version+} -o mongodb-enterprise-database.tar; \
   docker save quay.io/mongodb/mongodb-enterprise-ops-manager:<om-version> -o mongodb-enterprise-ops-manager.tar; \
   docker save quay.io/mongodb/mongodb-enterprise-init-ops-manager:{+version+} -o mongodb-enterprise-init-ops-manager.tar; \
   docker save quay.io/mongodb/mongodb-enterprise-init-appdb:{+version+} -o mongodb-enterprise-init-appdb.tar;
   docker save quay.io/mongodb/mongodb-enterprise-init-database:{+version+} -o mongodb-enterprise-init-database.tar;