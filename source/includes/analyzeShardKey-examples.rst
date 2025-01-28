{ _id: 1 } keyCharacteristics
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This example uses the |analyzeShardKey| to provide metrics on the 
``{ _id: 1 }`` shard key on the ``social.post`` collection.

The following code block uses
:method:`db.collection.configureQueryAnalyzer()` to turn on query
sampling:

.. code-block:: javascript

   use social
   db.post.configureQueryAnalyzer( 
      {
         mode: full,
         samplesPerSecond: 5
      } 
   )

After ``db.collection.configureQueryAnalyzer()`` collects query
samples, the following code block uses the |analyzeShardKey| to sample
10,000 documents and calculate results:

.. code-block:: javascript

   use social
   db.post.analyzeShardKey(
      { _id: 1 },
      {
         keyCharacteristics: true,
         readWriteDistribution: false
         sampleSize: 10000
      }
   )

{ lastName: 1 } keyCharacteristics
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This |analyzeShardKey| provides metrics on the 
``{ lastName: 1 }`` shard key on the ``social.post`` collection:

.. code-block:: javascript

   use social
   db.post.analyzeShardKey(
      { lastName: 1 },
      {
         keyCharacteristics: true,
         readWriteDistribution: false
      }
   )

The output for this example resembles the following:

.. include:: /includes/analyzeShardKey-example1-output.rst

{ userId: 1 } keyCharacteristics
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This |analyzeShardKey| provides metrics on the 
``{ userId: 1 }`` shard key on the ``social.post`` collection:

.. code-block:: javascript

   use social
   db.post.analyzeShardKey(
      { userId: 1 },
      {
         keyCharacteristics: true,
         readWriteDistribution: false
      }
   )

The output for this example resembles the following:

.. include:: /includes/analyzeShardKey-example2-output.rst

{ userId: 1 } readWriteDistribution
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This |analyzeShardKey| provides metrics on the 
``{ userId: 1 }`` shard key on the ``social.post`` collection:

.. code-block:: javascript

   use social
   db.post.analyzeShardKey(
      { userId: 1 },
      {
         keyCharacteristics: false,
         readWriteDistribution: true
      }
   )

The output for this example resembles the following:

.. include:: /includes/analyzeShardKey-example3-output.rst