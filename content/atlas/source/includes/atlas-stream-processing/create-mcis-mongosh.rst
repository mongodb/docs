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
      specification that lists both collections and enables
      ``initialSync``:

      .. code-block:: javascript
         :copyable: true

         let s = {
           $source: {
             connectionName: "<source-connection-name>",
             db: "sample_analytics",
             coll: ["customers", "accounts"],
             config: { fullDocument: "required" },
             initialSync: { enable: true }
           }
         }

      .. include:: /includes/atlas-stream-processing/mcis-source-stage-explanation.rst

   .. step:: Define a stage that prepares each event for the sink.

      Declare a variable and assign it a :pipeline:`$replaceRoot`
      stage specification:

      .. code-block:: javascript
         :copyable: true

         let r = {
           $replaceRoot: {
             newRoot: {
               $cond: {
                 if:   { $eq: [{ $meta: "stream.source.operationType" }, "delete"] },
                 then: { $meta: "stream.source.documentKey" },
                 else: "$fullDocument"
               }
             }
           }
         }

      .. include:: /includes/atlas-stream-processing/mcis-replaceroot-stage-explanation.rst

   .. step:: Define the sink stage.

      Declare a variable and assign it a :pipeline:`$merge` stage
      specification that routes each event by its source namespace:

      .. code-block:: javascript
         :copyable: true

         let m = {
           $merge: {
             into: {
               connectionName: "<destination-connection-name>",
               db:   { $meta: "stream.source.ns.db" },
               coll: { $meta: "stream.source.ns.coll" }
             },
             on: "_id",
             whenMatched: { $cond: {
                 if:   { $eq: [{ $meta: "stream.source.operationType" }, "delete"] },
                 then: "delete",
                 else: "replace"
             } },
             whenNotMatched: { $cond: {
                 if:   { $eq: [{ $meta: "stream.source.operationType" }, "delete"] },
                 then: "discard",
                 else: "insert"
             } }
           }
         }

      .. include:: /includes/atlas-stream-processing/mcis-merge-stage-explanation.rst

   .. step:: Create the stream processor.

      Use the :method:`sp.createStreamProcessor()` method to
      create a stream processor named ``replicate_analytics_sp``
      from the stages you defined:

      .. code-block:: javascript
         :copyable: true

         sp.createStreamProcessor("replicate_analytics_sp", [s, r, m])

      To assign the processor to a tier other than the tier of
      your {+spw+}, pass a ``tier`` option in the ``options``
      object. To choose a tier for your workload, see
      :ref:`atlas-sp-tier-guide`.

   .. step:: Start the stream processor.

      Use the :method:`sp.processor.start()` method to start
      ``replicate_analytics_sp``:

      .. io-code-block::
         :copyable: true

         .. input::
            :language: javascript

            sp.replicate_analytics_sp.start()

         .. output::
            :language: javascript
            :visible: false

            { ok: 1 }

      {+atlas-sp+} synchronizes ``customers`` and ``accounts`` to
      ``<destination-connection-name>``, then keeps both collections
      current. To learn
      more about starting, stopping, and monitoring stream
      processors, see :ref:`atlas-sp-manage-processor`.
