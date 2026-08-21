.. procedure::
   :style: normal

   .. step:: Connect to your {+spw+}.

      Use the connection string associated with your {+spw+} to
      connect using {+mongosh+}.

      a. In the pane for your {+spw+}, click :guilabel:`Connect`.

      #. In the :guilabel:`Connect to your workspace` dialog,
         select the :guilabel:`Shell` tab.

      #. Copy the connection string displayed in the dialog. It
         has the following format, where
         ``<atlas-stream-processing-url>`` is the URL of your
         {+spw+} and ``<username>`` is the username of a database
         user with the :atlasrole:`atlasAdmin` role:

         .. code-block:: sh

            mongosh "mongodb://<atlas-stream-processing-url>/"
            --tls --authenticationDatabase admin --username <username>
            --password <password>

      #. Paste the connection string into your terminal and
         replace the ``<password>`` placeholder with the
         credentials for the user. Press Enter to connect to your
         {+spw+}.

   .. step:: Define the source stage.

      Declare a variable and assign it a :pipeline:`$source` stage
      specification:

      .. code-block:: javascript
         :copyable: true

         let s = {
           $source: {
             connectionName: "<connection-name>",
             db: "sample_supplies",
             coll: "sales",
             config: {
               fullDocument: "required",
               fullDocumentBeforeChange: "required"
             }
           }
         }

      .. include:: /includes/atlas-stream-processing/smv-source-stage-explanation.rst

   .. step:: Define a stage that computes the change delta.

      Declare a variable and assign it an :pipeline:`$addFields`
      stage specification:

      .. code-block:: javascript
         :copyable: true

         let d = {
           $addFields: {
             _delta: {
               $switch: {
                 branches: [
                   {
                     case: {
                       $and: [
                         { $eq: ["$operationType", "insert"] },
                         { $eq: ["$fullDocument.status", "completed"] }
                       ]
                     },
                     then: 1
                   },
                   {
                     case: {
                       $and: [
                         { $eq: ["$operationType", "update"] },
                         { $eq: ["$fullDocumentBeforeChange.status", "completed"] },
                         { $eq: ["$fullDocument.status", "returned"] }
                       ]
                     },
                     then: -1
                   },
                   {
                     case: {
                       $and: [
                         { $eq: ["$operationType", "delete"] },
                         { $eq: ["$fullDocumentBeforeChange.status", "completed"] }
                       ]
                     },
                     then: -1
                   }
                 ],
                 default: 0
               }
             },
             _channel: {
               $ifNull: [
                 "$fullDocument.purchaseMethod",
                 "$fullDocumentBeforeChange.purchaseMethod"
               ]
             }
           }
         }

      .. include:: /includes/atlas-stream-processing/smv-addfields-stage-explanation.rst

   .. step:: Define a stage that drops events with no effect.

      Declare a variable and assign it a :pipeline:`$match` stage
      specification:

      .. code-block:: javascript
         :copyable: true

         let f = {
           $match: { _delta: { $ne: 0 } }
         }

      .. include:: /includes/atlas-stream-processing/smv-match-stage-explanation.rst

   .. step:: Define a windowed group stage.

      Declare a variable and assign it a :pipeline:`$tumblingWindow`
      stage specification:

      .. code-block:: javascript
         :copyable: true

         let w = {
           $tumblingWindow: {
             boundary: "processingTime",
             interval: { size: NumberInt(1), unit: "second" },
             pipeline: [
               {
                 $group: {
                   _id: "$_channel",
                   active_count: { $sum: "$_delta" },
                   windowStart: {
                     $first: { $meta: "stream.window.start" }
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

   .. step:: Define the sink stage.

      Declare a variable and assign it a :pipeline:`$merge` stage
      specification:

      .. code-block:: javascript
         :copyable: true

         let m = {
           $merge: {
             into: {
               connectionName: "<connection-name>",
               db: "sample_supplies",
               coll: "sales_by_channel"
             },
             whenMatched: [
               {
                 $set: {
                   active_count: {
                     $cond: [
                       { $gt: ["$$new.windowStart", { $ifNull: ["$lastWindowStart", { $toDate: 0 }] }] },
                       { $add: ["$active_count", "$$new.active_count"] },
                       "$active_count"
                     ]
                   },
                   lastWindowStart: {
                     $max: [
                       { $ifNull: ["$lastWindowStart", { $toDate: 0 }] },
                       "$$new.windowStart"
                     ]
                   }
                 }
               }
             ],
             whenNotMatched: "insert"
           }
         }

      .. include:: /includes/atlas-stream-processing/smv-merge-stage-explanation.rst

      .. note::

         The ``lastWindowStart`` high-water mark prevents a
         replayed window from double-counting

   .. step:: Create the stream processor.

      Use the :method:`sp.createStreamProcessor()` method to
      create a stream processor named ``sales_stats_sp`` from the
      stages you defined. The ``$group`` stage belongs to the
      nested pipeline of the ``$tumblingWindow`` stage, so don't
      include it in the processor pipeline definition.

      .. code-block:: javascript
         :copyable: true

         sp.createStreamProcessor("sales_stats_sp", [s, d, f, w, m])

      To assign the processor to a tier other than the tier of
      your {+spw+}, pass a ``tier`` option in the ``options``
      object. To choose a tier for your workload, see
      :ref:`atlas-sp-tier-guide`.

   .. step:: Start the stream processor.

      Use the :method:`sp.processor.start()` method to start
      ``sales_stats_sp``:

      .. io-code-block::
         :copyable: true

         .. input::
            :language: javascript

            sp.sales_stats_sp.start()

         .. output::
            :language: javascript
            :visible: false

            { ok: 1 }

      The processor now maintains ``sales_by_channel``
      continuously. To learn more about starting, stopping, and
      monitoring stream processors, see
      :ref:`atlas-sp-manage-processor`.
