queryAnalysisSampleExpirationSecs
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Sampled queries are stored in an internal collection that has a TTL
index with ``expireAfterSeconds``. To configure ``expireAfterSeconds``,
use the :parameter:`queryAnalysisSampleExpirationSecs` server parameter.
Sampled queries are automatically deleted after
``queryAnalysisSampleExpirationSecs``.
