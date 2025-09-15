If there are :term:`secondary indexes <secondary index>` on :ref:`time
series collections <manual-timeseries-collection>` and you need to
downgrade the feature compatibility version (FCV), you must first drop
any secondary indexes that are incompatible with the downgraded FCV.
For more information, see :dbcommand:`setFeatureCompatibilityVersion`.
