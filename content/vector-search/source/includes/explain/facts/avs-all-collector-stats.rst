The ``allCollectorStats`` is a |bson| document that describes collector
statistics across all collectors specified in the query. 
It contains the following keys: 

.. list-table:: 
   :header-rows: 1
   :widths: 40 60

   * - Field 
     - Description

   * - ``collect`` 
     - Tracks the duration and number of results collected by the
       collector.

   * - ``competitiveIterator``
     - Statistics tracking the total duration and the number of times a
       ``competitiveIterator`` was requested from the collector. 

   * - ``setScorer``
     - Statistics tracking the total duration and number of times a
       scorer was set on the collector.
