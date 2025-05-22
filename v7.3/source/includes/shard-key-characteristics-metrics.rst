``keyCharacteristic`` consists of the metrics about the 
:ref:`cardinality <sharding-shard-key-cardinality>`, :ref:`frequency 
<shard-key-frequency>`, and :ref:`monotonicity <shard-key-monotonic>` 
of the shard key. These metrics are only returned when 
``keyCharacteristics`` is true.

The metrics are calculated when |analyzeShardKey| is run based on 
documents sampled from the collection. The calculation requires the 
shard key to have a :ref:`supporting index <supporting-indexes-ref>`. 
If there is no supporting index, no metrics are returned.

You can configure sampling with the ``sampleRate`` and ``sampleSize`` 
fields. Both are optional and only one can be specified. If neither is 
specified, the sample size is set to ``10`` . Configure this value 
by setting 
``analyzeShardKeyCharacteristicsDefaultSampleSize``.  

To calculate metrics based on all documents in the collection, 
set the ``sampleRate`` to ``1``.
