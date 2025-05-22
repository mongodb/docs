Splits large :ref:`change stream <changeStreams>` events that exceed 16
MB into smaller fragments returned in a change stream cursor.

You can only use ``$changeStreamSplitLargeEvent`` in a ``$changeStream``
pipeline and it must be the final stage in the pipeline.
