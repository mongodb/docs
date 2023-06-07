If a cluster experiences an activity spike and generates an extremely large
quantity of log messages, |service| may stop collecting and storing new logs
for a period of time.

.. note::

   Log analysis rate limits apply only to the Performance Advisor UI, 
   the Query Profiler UI, the Access Tracking UI, and the |fts| Query
   Analytics UI. :oas-atlas-op:`Downloadable log files 
   </downloadLogsForOneClusterHostInOneProject>` are always 
   complete.
