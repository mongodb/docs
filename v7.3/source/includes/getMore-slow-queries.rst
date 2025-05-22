Starting in MongoDB 5.1, when a :dbcommand:`getMore` command is logged
as a :ref:`slow query <log-message-slow-ops>`, the :ref:`queryHash
<query-hash>` and :ref:`planCacheKey <plan-cache-key>` fields are added
to the :ref:`slow query log message <log-message-slow-ops>` and the
:ref:`profiler log message <database-profiler>`.
