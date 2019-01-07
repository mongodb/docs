:ref:`Process <mongodb-logs>` and :doc:`audit </database-auditing>` logs
are updated from the cluster backend infrastructure every five minutes
and contain log data from the previous five minutes. If you are polling
the API for log files, polling every five minutes is recommended.

.. example::

   If the logs are updated at 4:00 UTC and then you poll the API, the
   API returns log data from the interval between 3:55 UTC and 4:00 UTC.
