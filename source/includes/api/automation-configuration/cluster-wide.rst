**clusterWideConfigurations** specifies the parameters to set across a
replica set or sharded cluster without requiring a :term:`rolling restart`.

.. code-block:: json
   :linenos:

   "clusterWideConfigurations" : { 
     "<replicaSetID/clusterName>": {
       "changeStreamOptions": {
         "preAndPostImages": {
           "expireAfterSeconds": <integer>
         }
       }
     }
   }

.. list-table::
   :widths: 20 14 11 55
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Necessity
     - Description

   * - replicaSetID/clusterName
     - object
     - Optional
     - The change stream options to apply to the replica set or sharded
       cluster. {+mdbagent+} only checks if this configuration is in a
       valid |json| format but doesn't check the values for correctness.

   * - changeStreamOptions.preAndPostImages.expireAfterSeconds
     - number
     - Required
     - Retention policy of change stream pre- and post-images in
       seconds. If you omit the value, the cluster retains the
       pre- and post-images until it removes the corresponding change
       stream events from the oplog.
       
       If you remove this value, {+mdbagent+} only removes this 
       parameter from its automation configuration, but not from the
       server.

       .. seealso:: :manual:`changeStreamOptions </reference/cluster-parameters/#mongodb-parameter-param.changeStreamOptions.preAndPostImages.expireAfterSeconds>`. 
