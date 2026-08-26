.. procedure::
   :style: normal

   .. step:: Go to the Stream Processing page for your project.

      a. In the {+atlas-ui+}, go to the :guilabel:`Stream
         Processing` page for your {+service+} project.

      #. Click :guilabel:`Manage` in the pane of your {+spw+} that
         holds your {+service+} connections to the source and
         destination clusters.

   .. step:: Open the Visual Builder.

      a. Click :guilabel:`Create stream processor`.

      #. Select the :guilabel:`Visual Builder`.

   .. step:: Configure the source with an explicit collection list.

      a. In the :guilabel:`Source` field, select your {+service+}
         connection to the source cluster from the
         :guilabel:`Connection` drop-down list.

      #. In the |json| text box, configure the :pipeline:`$source`
         stage:

      .. code-block:: json
         :copyable: true

         {
           "$source": {
             "connectionName": "<source-connection-name>",
             "db": "sample_analytics",
             "coll": ["customers", "accounts"],
             "config": { "fullDocument": "required" },
             "initialSync": { "enable": true }
           }
         }

      .. include:: /includes/atlas-stream-processing/mcis-source-stage-explanation.rst

   .. step:: Add a stage that prepares each event for the sink.

      a. In the :guilabel:`Start building your pipeline` pane,
         click :guilabel:`+ Custom stage`.

      #. In the |json| text box, add a :pipeline:`$replaceRoot`
         stage:

      .. code-block:: json
         :copyable: true

         {
           "$replaceRoot": {
             "newRoot": {
               "$cond": {
                 "if": { "$eq": [{ "$meta": "stream.source.operationType" }, "delete"] },
                 "then": { "$meta": "stream.source.documentKey" },
                 "else": "$fullDocument"
               }
             }
           }
         }

      .. include:: /includes/atlas-stream-processing/mcis-replaceroot-stage-explanation.rst

   .. step:: Configure the sink with dynamic namespace routing.

      a. In the :guilabel:`Sink` field, select your {+service+}
         connection to the destination cluster from the
         :guilabel:`Connection` drop-down list.

      #. In the |json| text box, configure the :pipeline:`$merge`
         stage:

      .. code-block:: json
         :copyable: true

         {
           "$merge": {
             "into": {
               "connectionName": "<destination-connection-name>",
               "db": { "$meta": "stream.source.ns.db" },
               "coll": { "$meta": "stream.source.ns.coll" }
             },
             "on": "_id",
             "whenMatched": {
               "$cond": {
                 "if": { "$eq": [{ "$meta": "stream.source.operationType" }, "delete"] },
                 "then": "delete",
                 "else": "replace"
               }
             },
             "whenNotMatched": {
               "$cond": {
                 "if": { "$eq": [{ "$meta": "stream.source.operationType" }, "delete"] },
                 "then": "discard",
                 "else": "insert"
               }
             }
           }
         }

      .. include:: /includes/atlas-stream-processing/mcis-merge-stage-explanation.rst

   .. step:: Enter processor details.

      a. In the :guilabel:`Stream processor name` field, enter
         ``replicate_analytics_sp``.

      #. Select the tier for the stream processor. To choose a
         tier for your workload, see :ref:`atlas-sp-tier-guide`.

   .. step:: Create the stream processor.

      Click :guilabel:`Create stream processor`.

   .. step:: Start the stream processor.

      On the :guilabel:`Stream Processors` tab, select
      ``replicate_analytics_sp`` and click :guilabel:`Start`.

      {+atlas-sp+} synchronizes ``customers`` and ``accounts`` to
      ``<destination-connection-name>``, then keeps both collections
      current. To learn
      more about starting, stopping, and monitoring stream
      processors, see :ref:`atlas-sp-manage-processor`.
