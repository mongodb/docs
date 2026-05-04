.. code-block:: javascript
   :copyable: false

   {
     cursor: {
       id: Long('0'),
       ns: 'test.$cmd.aggregate',
       firstBatch: [
         {
           type: 'InconsistentIndex',
           description: 'Found an index of a sharded collection that is inconsistent between different shards',
           details: {
             namespace: 'test.reviews',
             info: { 
               missingFromShards: [],
               inconsistentProperties: [
                 { k: 'expireAfterSeconds', v: Long('600') },
                 { k: 'expireAfterSeconds', v: 3600 }
               ],
               indexName: 'reviewDt_1'
             }
           }
         },
         {
           type: 'InconsistentIndex',
           description: 'Found an index of a sharded collection that is inconsistent between different shards',
           details: {
             namespace: 'test.reviews',
             info: {
               missingFromShards: [ 'shard02' ],
               inconsistentProperties: [],
               indexName: 'page_1_score_1'
             }
           }
         }
       ]
     },
     ok: 1,
     '$clusterTime': {
       clusterTime: Timestamp({ t: 1752574769, i: 1 }),
       signature: {
         hash: Binary.createFromBase64('AAAAAAAAAAAAAAAAAAAAAAAAAAA=', 0),
         keyId: Long('0')
       }
     },
     operationTime: Timestamp({ t: 1752574760, i: 1 })
   }