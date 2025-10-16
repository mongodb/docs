.. code-block:: sh

   docker save quay.io/mongodb/mongodb-kubernetes-operator:{+dl-version+} -o mongodb-kubernetes-operator.tar; \
   docker save quay.io/mongodb/mongodb-kubernetes-database:{+dl-version+} -o mongodb-enterprise-database.tar; \
   docker save quay.io/mongodb/mongodb-enterprise-ops-manager-ubi:<om-version> -o mongodb-enterprise-ops-manager.tar; \
   docker save quay.io/mongodb/mongodb-kubernetes-init-ops-manager:{+dl-version+} -o mongodb-kubernetes-init-ops-manager.tar; \
   docker save quay.io/mongodb/mongodb-kubernetes-init-appdb:{+dl-version+} -o mongodb-kubernetes-init-appdb.tar;
   docker save quay.io/mongodb/mongodb-kubernetes-init-database:{+dl-version+} -o mongodb-kubernetes-init-database.tar;