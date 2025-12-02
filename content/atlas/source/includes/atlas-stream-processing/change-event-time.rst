:gold:`IMPORTANT:` Each Change Event includes ``wallTime`` and ``clusterTime``
fields. {+atlas-sp+} stages after ``$source`` expect to receive
these fields as the processor ingested them. To ensure proper
processing of Change Stream data, do not modify these fields in
``$source.config.pipeline``.
