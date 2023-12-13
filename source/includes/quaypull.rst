.. code-block:: sh

   docker pull quay.io/mongodb/mongodb-enterprise-operator:<op-version>; \
   docker pull quay.io/mongodb/mongodb-enterprise-database:<db-version>; \
   docker pull quay.io/mongodb/mongodb-enterprise-ops-manager:<om-version>; \
   docker pull quay.io/mongodb/mongodb-enterprise-appdb:{+appdb-agent-version+}; \
   docker pull quay.io/mongodb/mongodb-enterprise-init-ops-manager:{+ops-manager-init-version+}; \
   docker pull quay.io/mongodb/mongodb-enterprise-init-appdb:{+appdb-init-version+}; \
   docker pull quay.io/mongodb/mongodb-enterprise-init-database:{+database-init-version+};