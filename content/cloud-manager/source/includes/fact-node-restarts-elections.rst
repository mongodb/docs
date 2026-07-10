.. note::

   |mms| restarts a node in a replica set or sharded cluster when you
   change :ref:`configuraton file options <configuration-options>`
   for the MongoDB process running on the node. The following options trigger
   a restart only for the specified changes:


   - :setting:`security.clusterAuthMode`: Changing the value from ``keyfile``
     to ``sendKeyFile`` triggers a restart. All other changes to this
     option do not.

   - :setting:`net.tls.mode`: Changing the value from ``disabled`` to
     ``allowTLS`` triggers a restart. All other changes to this option
     do not.

   A restarted node triggers an election if the node was the primary.
   In addition, modifying the :ref:`member settings <replica-set-configuration-buildIndexes>`
   of the current primary may trigger an election.
