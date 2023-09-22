queryAnalysisSampleExpirationSecs
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Sampled queries are stored in an internal collection that has a TTL
index with ``expireAfterSeconds``. Configure ``expireAfterSeconds``
with the ``queryAnalysisSampleExpirationSecs`` server parameter.
with the :parameter:`queryAnalysisSampleExpirationSecs`.
Sampled queries are automatically deleted after
``queryAnalysisSampleExpirationSecs``.
