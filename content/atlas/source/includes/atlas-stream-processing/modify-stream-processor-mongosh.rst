Requires {+mongosh+} v2.3.4+. 

Use the ``sp.<streamprocessor>.modify()`` command to modify an existing 
stream processor. ``<streamprocessor>`` must be the name of a stopped stream 
processor defined for the current {+spw+}.

For example, to modify a stream processor named ``proc01``, run the
following command:

.. code-block:: javascript

   sp.proc1.modify(<pipeline>, {
      resumeFromCheckpoint: bool, // optional 
      name: string, // optional
      dlq: string, // optional
  })


Add a Stage to an Existing Pipeline
````````````````````````````````````

.. code-block:: javascript

   sp.createStreamProcessor("foo", [
     {$source: {
        connectionName: "StreamsAtlasConnection",
        db: "test",
        coll: "test"
    }},
    {$merge: {
        into: {
            connectionName: "StreamsAtlasConnection",
            db: "testout",
            coll: "testout"
        }
    }}
  ])
  sp.foo.start();

.. code-block:: javascript

   sp.foo.stop();
   sp.foo.modify([
     {$source: {
       connectionName: "StreamsAtlasConnection",
       db: "test",
       coll: "test"
     }},
     {$match: {
       operationType: "insert"
     }},
     {$merge: {
        into: {
        connectionName: "StreamsAtlasConnection",
        db: "testout",
        coll: "testout2"
        }
     }}
   ]);
   sp.foo.start();

Modify the Input Source of a Stream Processor
``````````````````````````````````````````````

.. code-block:: javascript

   sp.foo.modify([
     {$source: {
       connectionName: "StreamsAtlasConnection",
       db: "test",
       coll: "test",
       config: {
         startAtOperationTime: new Date(now.getTime() - 5 * 60 * 1000)
       }
     }},
     {$match: {
       operationType: "insert"
     }},
     {$merge: {
       into: {
         connectionName: "StreamsAtlasConnection",
         db: "testout",
         coll: "testout2"
       }
     }}
   ], {resumeFromCheckpoint: false});

Remove a Dead Letter Queue from a Stream Processor
```````````````````````````````````````````````````
.. code-block:: javascript

   sp.foo.stop();
   sp.foo.modify({dlq: {}})
   sp.foo.start();    

Modify a Stream Processor with a Window
````````````````````````````````````````

.. code-block:: javascript

   sp.foo.stop();
   sp.foo.modify([
     {$source: {
       connectionName: "StreamsAtlasConnection",
       db: "test",
       coll: "test"
     }},
     {$replaceRoot: {newRoot: "$fullDocument"}},
     {$match: {cost: {$gt: 500}}},
     {$tumblingWindow: {
       interval: {unit: "day", size: 1},
       pipeline: [
        {$group: {_id: "$customerId", sum: {$sum: "$cost"}, avg: {$avg: "$cost"}}}
       ]
     }},
     {$merge: {
       into: {
       connectionName: "StreamsAtlasConnection",
       db: "testout",
       coll: "testout"
      }
     }}
   ], {resumeFromCheckpoint: false});
   sp.foo.start();
