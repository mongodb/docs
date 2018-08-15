.. list-table::
   :header-rows: 1
   :widths: 30 10 60

   * - Field
     - Required/Optional
     - Description
       
   * - ``since``
     - Optional
     - Point in time, specified as milliseconds since the `Unix Epoch <https://en.wikipedia.org/wiki/Unix_time>`_,
       from which you want to receive results. If you do not also specify
       the ``duration`` parameter, the endpoint returns results from
       ``since`` until the current time. If you do not specify either
       ``duration`` or ``since``, the endpoint returns data for the 
       previous 24 hours.
   
   * - ``duration``
     - Optional
     - Length of time from the ``since`` parameter, in milliseconds,
       for which you want to receive results. If you do not also specify
       the ``since`` parameter, the endpoint returns results from the
       number of milliseconds specified by ``duration`` before the
       current time until now. If you do not specify either
       ``duration`` or ``since``, the endpoint returns data for the 
       previous 24 hours.
       
   * - ``envelope``
     - Optional
     - Boolean that specifies whether or not to wrap the response in an
       :ref:`envelope <api-envelope>`. Default is ``false``.