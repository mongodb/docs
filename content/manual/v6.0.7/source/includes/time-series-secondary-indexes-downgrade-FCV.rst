If there are :term:`secondary indexes <secondary index>` on :ref:`time
series collections <manual-timeseries-collection>` and you need to
downgrade the Feature Compatibility Version (FCV), you must first drop
any secondary indexes that are incompatible with the downgraded FCV.
See :dbcommand:`setFeatureCompatibilityVersion`.
