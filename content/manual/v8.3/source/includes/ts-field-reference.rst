Time Series Field Reference
~~~~~~~~~~~~~~~~~~~~~~~~~~~

A time series collection includes the following fields:

.. list-table::
  :header-rows: 1
  :widths: 40 20 60

  * - Field
    
    - Type
     
    - Description
     
  * - ``timeseries.timeField``
    - string
    - .. include:: /includes/time-series/fact-time-field-description.rst

  * - ``timeseries.metaField``
    - string
    - .. include:: /includes/time-series/fact-meta-field-description.rst

  * - ``timeseries.granularity``
    - integer
    - .. include:: /includes/time-series/fact-granularity-field-description.rst

  * - ``timeseries.bucketMaxSpanSeconds``
    - integer
    - .. include:: /includes/time-series/fact-bucketmaxspanseconds-field-description.rst

  * - ``timeseries.bucketRoundingSeconds``
    - integer
    - .. include:: /includes/time-series/fact-bucketroundingseconds-field-description.rst

  * - ``expireAfterSeconds``
    - integer
    - Optional. Enable the automatic deletion of documents in a
      time series collection by specifying the number of seconds
      after which documents expire. MongoDB deletes expired documents
      automatically. See :ref:`manual-timeseries-automatic-removal` for
      more information.

Other allowed options that are not specific to time series collections are:

- ``storageEngine``
- ``indexOptionDefaults``
- ``collation``
- ``writeConcern``
- ``comment``
