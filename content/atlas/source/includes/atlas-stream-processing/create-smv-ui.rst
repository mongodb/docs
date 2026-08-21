.. procedure::
   :style: normal

   .. step:: Go to the Stream Processing page for your project.

      a. In the {+atlas-ui+}, go to the :guilabel:`Stream
         Processing` page for your {+service+} project.

      #. Click :guilabel:`Manage` in the pane of your {+spw+} that
         holds your {+service+} connection to the source cluster.

   .. step:: Open the Visual Builder.

      a. Click :guilabel:`Create stream processor`.

      #. Select the :guilabel:`Visual Builder`.

   .. step:: Configure the source.

      a. In the :guilabel:`Source` field, select your {+service+}
         connection to the source cluster from the
         :guilabel:`Connection` drop-down list.

      #. In the |json| text box, configure the :pipeline:`$source`
         stage:

      .. code-block:: json
         :copyable: true

         {
           "$source": {
             "connectionName": "<connection-name>",
             "db": "sample_supplies",
             "coll": "sales",
             "config": {
               "fullDocument": "required",
               "fullDocumentBeforeChange": "required"
             }
           }
         }

      .. include:: /includes/atlas-stream-processing/smv-source-stage-explanation.rst

   .. step:: Add a stage that computes the change delta.

      a. In the :guilabel:`Start building your pipeline` pane,
         click :guilabel:`+ Custom stage`.

      #. In the |json| text box, add an :pipeline:`$addFields`
         stage:

      .. code-block:: json
         :copyable: true

         {
           "$addFields": {
             "_delta": {
               "$switch": {
                 "branches": [
                   {
                     "case": {
                       "$and": [
                         { "$eq": ["$operationType", "insert"] },
                         { "$eq": ["$fullDocument.status", "completed"] }
                       ]
                     },
                     "then": 1
                   },
                   {
                     "case": {
                       "$and": [
                         { "$eq": ["$operationType", "update"] },
                         { "$eq": ["$fullDocumentBeforeChange.status", "completed"] },
                         { "$eq": ["$fullDocument.status", "returned"] }
                       ]
                     },
                     "then": -1
                   },
                   {
                     "case": {
                       "$and": [
                         { "$eq": ["$operationType", "delete"] },
                         { "$eq": ["$fullDocumentBeforeChange.status", "completed"] }
                       ]
                     },
                     "then": -1
                   }
                 ],
                 "default": 0
               }
             },
             "_channel": {
               "$ifNull": [
                 "$fullDocument.purchaseMethod",
                 "$fullDocumentBeforeChange.purchaseMethod"
               ]
             }
           }
         }

      .. include:: /includes/atlas-stream-processing/smv-addfields-stage-explanation.rst

   .. step:: Add a stage that drops events with no effect.

      a. Click :guilabel:`+`, then select :guilabel:`Custom
         stage`.

      #. In the |json| text box, add a :pipeline:`$match` stage:

      .. code-block:: json
         :copyable: true

         {
           "$match": { "_delta": { "$ne": 0 } }
         }

      .. include:: /includes/atlas-stream-processing/smv-match-stage-explanation.rst

   .. step:: Add a windowed group stage.

      a. Click :guilabel:`+`, then select :guilabel:`Custom
         stage`.

      #. In the |json| text box, add a :pipeline:`$tumblingWindow`
         stage:

      .. code-block:: json
         :copyable: true

         {
           "$tumblingWindow": {
             "boundary": "processingTime",
             "interval": { "size": 1, "unit": "second" },
             "pipeline": [
               {
                 "$group": {
                   "_id": "$_channel",
                   "active_count": { "$sum": "$_delta" },
                   "windowStart": {
                     "$first": { "$meta": "stream.window.start" }
                   }
                 }
               }
             ]
           }
         }

      .. include:: /includes/atlas-stream-processing/smv-window-stage-explanation.rst

      .. note::

         A stream processor requires every :pipeline:`$group`
         stage to run inside a window stage.

   .. step:: Configure the sink.

      a. In the :guilabel:`Sink` field, select your {+service+}
         connection from the :guilabel:`Connection` drop-down
         list.

      #. In the |json| text box, configure the :pipeline:`$merge`
         stage:

      .. code-block:: json
         :copyable: true

         {
           "$merge": {
             "into": {
               "connectionName": "<connection-name>",
               "db": "sample_supplies",
               "coll": "sales_by_channel"
             },
             "whenMatched": [
               {
                 "$set": {
                   "active_count": {
                     "$cond": [
                       { "$gt": ["$$new.windowStart", { "$ifNull": ["$lastWindowStart", { "$toDate": 0 }] }] },
                       { "$add": ["$active_count", "$$new.active_count"] },
                       "$active_count"
                     ]
                   },
                   "lastWindowStart": {
                     "$max": [
                       { "$ifNull": ["$lastWindowStart", { "$toDate": 0 }] },
                       "$$new.windowStart"
                     ]
                   }
                 }
               }
             ],
             "whenNotMatched": "insert"
           }
         }

      .. include:: /includes/atlas-stream-processing/smv-merge-stage-explanation.rst

      .. note::

         The ``lastWindowStart`` high-water mark prevents a
         replayed window from double-counting

   .. step:: Enter processor details.

      a. In the :guilabel:`Stream processor name` field, enter
         ``sales_stats_sp``.

      #. Select the tier for the stream processor. To choose a
         tier for your workload, see :ref:`atlas-sp-tier-guide`.

   .. step:: Create the stream processor.

      Click :guilabel:`Create stream processor`.

   .. step:: Start the stream processor.

      On the :guilabel:`Stream Processors` tab, select
      ``sales_stats_sp`` and click :guilabel:`Start`.

      The processor now maintains ``sales_by_channel``
      continuously. To learn more about starting, stopping, and
      monitoring stream processors, see
      :ref:`atlas-sp-manage-processor`.
