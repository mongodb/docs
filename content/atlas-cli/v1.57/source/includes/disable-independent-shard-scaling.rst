.. procedure::
   :style: normal

   .. step:: Retrieve the independent shard scaling schema.

      Make a request to the {+atlas-admin-api+}
      :oas-bump-atlas-op:`Return One Cluster from One Project
      <getgroupcluster>` endpoint. The request returns one
      ``replicationSpecs`` entry per shard.

   .. step:: Select a template schema.

      From among the ``replicationSpecs``, select one to which to
      match the other shards for symmetric scaling. Note the following
      properties from the chosen shard's ``regionConfigs``:

      - ``instanceSize`` for each shard role such as
	``electableSpecs``, ``readOnlySpecs``, or ``analyticsSpecs``.
      - ``diskSizeGB``, ``ebsVolumeType``, and ``diskIOPS``, or
	equivalent storage fields for the various cluster vendors.

      To ensure continuity of performance, select your highest-tier
      shard as the template.
	
   .. step:: Compose a symmetric ``replicationSpecs`` array.

      Using your chosen template schema as a basis, compose a
      ``PATCH`` request payload in which each shard's
      ``instanceSize`` values for ``electableSpecs`` and
      ``readOnlySpecs`` are identical.

      .. code-block:: json

	 {
	   "replicationSpecs": [
	     {
	       "id": "SHARD_ID_0",
	       "regionConfigs": [
	         {
		   "providerName": "AWS",
		   "regionName": "US_EAST_1",
		   "zoneName": "Zone1",
		   "electableSpecs": {
		     "instanceSize": "M60",
		     "nodeCount": 3,
		     "diskSizeGB": 2048,
		     "ebsVolumeType": "PROVISIONED",
		     "diskIOPS": 4000
		   },
		   "readOnlySpecs": {
		     . . .
		   },
		   "analyticsSpecs": {
		     . . .
		   }
		 }
	       ]
	     },
	     {
	       "id": "SHARD_ID_1",
	       "regionConfigs": [
	         . . .
	       ]
	     },
	       . . .
	   ]
	 }

   You must preserve the ``id`` values of existing shards. Match the
   tier, storage, and disk settings for every shard.

   .. step:: Apply the ``PATCH``.

      Make a request to the {+atlas-admin-api+}
      :oas-bump-atlas-op:`Update One Cluster in One Project` endpoint
      using the payload defined previously. This initiates a rolling
      resize of all shards in the cluster.
	 
Once you resize your shards to restore symmetry, you can revert to
using the ``2024-10-23`` API resource version. This version relies on
the symmetric ``replicationSpecs.numShards`` model.
