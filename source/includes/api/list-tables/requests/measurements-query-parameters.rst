.. list-table::
   :widths: 20 14 11 45 10
   :stub-columns: 1

   * - granularity
     - string
     - Required
     - |iso8601-duration| that specifies the interval between
       measurement data points.

       .. example::

          **PT1M** specifies 1-minute granularity.

       |service| supports the following subset of |iso8601|\-formatted
       time periods:

       - **PT10S**
         
         .. include:: /includes/fact-10-second-granularity.rst

       - **PT1M**
       - **PT5M**
       - **PT1H**
       - **P1D**

       When you specify **granularity**, you must specify either
       **period** *or* **start** and **end**.

       |service| retrieves database metrics every 20 minutes by
       default. Results include data points with 20 minute intervals.

       To learn more, see :ref:`review-mongodb-process-metrics`.
     -

   * - period
     - string
     - Required
     - |iso8601-duration| that specifies the length of time in the past
       to query. Mutually exclusive with **start** and **end**.

       .. example::

          To request the last 36 hours, specify: **period=P1DT12H**.
     -

   * - start
     - string
     - Required
     - |iso8601-time| when to start retrieving measurements. If you
       specify **start** you must also specify **end**. Mutually
       exclusive with **period**.
     -

   * - end
     - string
     - Required
     - |iso8601-time| when to stop retrieving measurements.

       If you specify **end** you must also specify **start**. Mutually
       exclusive with **period**.
     -

   * - m
     - string
     - Optional
     - Type of measurements this endpoint return. If you don't set
       **m**, the endpoint returns all measurements.

       To specify multiple values for **m**, you must repeat the **m**
       parameter.

       .. example::

          .. code-block:: none

             ../measurements?m=<measurement>&m=<measurement>&m=...

       You must specify measurements that are valid for the host.
       |service| returns an error if any specified measurements are
       invalid.

       The `Measurement Values <#measurement-values>`_ section details
       these metrics.
     -

