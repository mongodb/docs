
If you use a :manual:`replica set </reference/glossary/#std-term-replica-set>` for the database's
:doc:`backing instance </tutorial/prepare-backing-mongodb-instances>`,
with a standard connection string, include all members
of the replica set in the |uri|. If you omit the port number,
|onprem| uses the default **27017** port for all hosts.

.. note::

         |onprem| doesn't require the :ref:`replicaSet <replica-set-option>`
         option in the |uri|.