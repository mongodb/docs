For querying with :ref:`regex-ref` or :ref:`wildcard-ref`, you can't use
|token-filter| as the ``searchAnalyzer`` as it produces more than one
output token per input token. Specify a different analyzer as the
``searchAnalyzer`` in your index definition.