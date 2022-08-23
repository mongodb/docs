In rare circumstances, a write can fail due to cache pressure. When
this happens MongoDB issues a ``TemporarilyUnavailable`` error and
increments the ``temporarilyUnavailableErrors`` counter in two places:
the slow query log and the :ref:`Full Time Diagnostic Data Collection
(FTDC) <ftdc-stub>`.

Individual operations within multi-document transactions never return
``TemporarilyUnavailable`` errors.

Adjust the write retry properties by modifying the
:parameter:`temporarilyUnavailableBackoffBaseMs` and
:parameter:`temporarilyUnavailableMaxRetries` parameters.

