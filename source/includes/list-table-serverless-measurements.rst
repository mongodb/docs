.. _serverless-measurements:

Serverless Measurements
-----------------------

.. list-table::
   :widths: 20 80
   :header-rows: 1

   * - Metric Name
     - Description

   * - ``SERVERLESS_CONNECTIONS``
     - Number of active connections to the {+serverless-instance+} 
       meets the specified average.

   * - ``SERVERLESS_CONNECTIONS_PERCENT``
     - Number of open connections to the {+serverless-instance+} 
       exceeds the specified percentage threshold.

   * - ``SERVERLESS_DATA_SIZE_TOTAL``
     - Approximate size of all documents (and their paddings) meets 
       the specified threshold.

   * - ``SERVERLESS_NETWORK_BYTES_IN``
     - Number of bytes sent *to* MongoDB meets the specified threshold.
       
   * - ``SERVERLESS_NETWORK_BYTES_OUT``
     - Number of bytes sent *from* MongoDB meets the specified 
       threshold.
      
   * - ``SERVERLESS_NETWORK_NUM_REQUESTS``
     - Number of requests sent to MongoDB meets the specified average.
       
   * - ``SERVERLESS_OPCOUNTER_CMD``
     - Rate of commands performed meets the specified threshold.
      
   * - ``SERVERLESS_OPCOUNTER_DELETE``
     - Rate of deletes meets the specified threshold.

   * - ``SERVERLESS_OPCOUNTER_GETMORE``
     - Rate of ``getmore`` operations to retrieve the next cursor 
       batch meets the specified threshold.

   * - ``SERVERLESS_OPCOUNTER_INSERT``
     - Rate of inserts meets the specified threshold.
      
   * - ``SERVERLESS_OPCOUNTER_QUERY``
     - Rate of queries meets the specified threshold.
      
   * - ``SERVERLESS_OPCOUNTER_UPDATE``
     - Rate of updates meets the specified threshold.
      
   * - ``SERVERLESS_TOTAL_READ_UNITS``
     - Total read units meet the specified threshold.

   * - ``SERVERLESS_TOTAL_WRITE_UNITS``
     - Total write units meet the specified threshold.
