.. tabs::

   .. tab:: Replica Sets
      :tabid: replset

      If you use a :manual:`replica set </reference/glossary/#std-term-replica-set>` for the database's
      :doc:`backing instance </tutorial/prepare-backing-mongodb-instances>`,
      your connection string may include either the hostnames of all
      replica set members or the hostname for the |dns| seedlist.

      .. include:: /includes/tabsets/connstring/replset-stringformat.rst

   .. tab:: Sharded Cluster
      :tabid: sharded

      If you use a :manual:`sharded cluster </reference/glossary/#std-term-sharded-cluster>` for the database's
      :doc:`backing instance </tutorial/prepare-backing-mongodb-instances>`,
      your connection string may include either the hostnames of all
      |mongos| routers or the hostname for the |dns| seedlist.

      .. include:: /includes/tabsets/connstring/sharded-stringformat.rst
