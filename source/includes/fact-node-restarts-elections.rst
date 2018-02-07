.. note::

   |mms| restarts a node in a replica set or sharded cluster when you
   change :manual:`configuraton file options </reference/configuration-options>`
   for the MongoDB process running on the node. The following options trigger
   a restart only for the specified changes:


   - ``security.clusterAuthMode``: Changing the value from ``keyfile``
     to ``sendKeyFile`` triggers a restart. All other changes to this
     option do not.

   - ``net.ssl.mode``: Changing the value from ``disabled`` to
     ``allowSSL`` triggers a restart. All other changes to this option
     do not.

   A restarted node triggers an election if the node was the primary.
   In addition, modifying the :manual:`member settings 
   </reference/replica-configuration/#members>`
   of the current primary may trigger an election.
