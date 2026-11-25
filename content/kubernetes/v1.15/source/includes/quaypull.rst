.. code-block:: sh

   docker pull quay.io/mongodb/mongodb-kubernetes-operator:{+dl-version+}; \
   docker pull quay.io/mongodb/mongodb-kubernetes-database:{+dl-version+}; \
   docker pull quay.io/mongodb/mongodb-enterprise-ops-manager-ubi:<om-version>; \
   docker pull quay.io/mongodb/mongodb-kubernetes-init-ops-manager:{+dl-version+}; \
   docker pull quay.io/mongodb/mongodb-kubernetes-init-appdb:{+dl-version+}; \
   docker pull quay.io/mongodb/mongodb-kubernetes-init-database:{+dl-version+};