Optional. Do not use if setting ``bucketRoundingSeconds`` and 
``bucketMaxSpanSeconds``. 

Possible values are ``seconds`` (default), ``minutes``, and ``hours``.

Set ``granularity`` to the value that most closely matches 
the time between consecutive incoming timestamps. This
improves performance by optimizing how MongoDB stores data in the 
collection.

For more information on granularity and bucket intervals, see 
:ref:`timeseries-granularity`.