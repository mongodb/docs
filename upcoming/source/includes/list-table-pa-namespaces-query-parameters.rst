.. list-table::
   :header-rows: 1
   :widths: 15 10 10 65

   * - Field
     - Optional/Required
     - Type
     - Description
       
   * - ``since``
     - Optional
     - number
     - Point in time, specified as milliseconds since the `Unix Epoch <https://en.wikipedia.org/wiki/Unix_time>`_,
       from which you want to receive results. If you do not also specify
       the ``duration`` parameter, the endpoint returns results from
       ``since`` until the current time.
   
   * - ``duration``
     - Optional
     - number
     - Length of time from the ``since`` parameter, in milliseconds,
       for which you want to receive results. If you do not also specify
       the ``since`` parameter, the endpoint returns results from the
       number of milliseconds specified by ``duration`` before the
       current time until now.
       
   * - ``envelope``
     - Optional
     - boolean
     - Specifies whether or not to wrap the response in an
       :ref:`envelope <api-envelope>`. The default is ``false``.

   * - ``pretty``
     - Optional
     - boolean
     - Indicates whether the response body should be in a 
       `prettyprint <https://en.wikipedia.org/w/index.php?title=Unix_time&oldid=856146990>`_ 
       format. The default value is ``false``.