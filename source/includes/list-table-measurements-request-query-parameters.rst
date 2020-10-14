.. list-table::
   :header-rows: 1
   :widths: 30 10 60

   * - Field
     - Required/Optional
     - Description

   * - ``granularity``
     - Required
     - An ISO-8601_-formatted time
       period that specifies the interval between measurement data points. For
       example, ``PT1M`` specifies 1-minute granularity.

       The following subset of ISO-8601_-formatted time periods are 
       supported:

       - ``PT1M``
       - ``PT5M``
       - ``PT1H``
       - ``P1D``

       When you specify ``granularity``, you must specify either ``period``
       *or* ``start`` and ``end``.

   * - ``period``
     - Required
     - An ISO-8601_-formatted time period that specifies the length of time in
       the past to query. For example, to request the last 36 hours, specify:
       ``period=P1DT12H``. Mutually exclusive with ``start`` and ``end``.

   * - ``start``
     - Required
     - The time at which to start retrieving measurements, as specified by an
       ISO-8601_ timestamp string. If you specify ``start`` you must also
       specify ``end``. Mutually exclusive with ``period``.

   * - ``end``
     - Required
     - The time at which to stop retrieving measurements, as specified by an
       ISO-8601_ timestamp string. If you specify ``end`` you must also
       specify ``start``. Mutually exclusive with ``period``.

   * - ``m``
     - Optional
     - Specifies which measurements to return. If ``m`` is not specified, all
       measurements are returned.

       To specify multiple values for ``m``, you must repeat the ``m``
       parameter. For example:

       .. code-block:: none

          ../measurements?m=<measurement>&m=<measurement>&m=...

       You must specify measurements that are valid for the host. |service|
       returns an error if any specified measurements are invalid
       For available measurements, see :ref:`disk-measurement-types`.

   * - ``pageNum``
     - Optional.
     - The page to return.

       Defaults to ``1``.

   * - ``itemsPerPage``
     - Optional.
     - Number of items to return per page, up to a maximum of 500.
     
       Defaults to ``100``.

   * - ``includeCount``
     - Optional.
     - Specifies whether the response returns the ``totalCount`` field.

       Defaults to ``true``.

   * - ``envelope``
     - Optional.
     - A boolean that specifies whether or not to wrap the response in an
       :ref:`envelope <api-envelope>`.

       Defaults to ``false``.

   * - ``pretty``
     - Optional
     - A boolean that specifies whether or not to return a "pretty-printed"
       JSON document.

       Defaults to ``false``.
