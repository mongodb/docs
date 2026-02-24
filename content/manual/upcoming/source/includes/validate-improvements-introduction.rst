Starting in MongoDB 6.2, the :dbcommand:`validate` command and
:method:`db.collection.validate()` method:

- Check collections to ensure the
  :ref:`BSON documents <bson-document-format>` conform to the BSON
  specifications.
- Check :ref:`time series collections <manual-timeseries-collection>`
  for internal data inconsistencies.
- Have a new option ``checkBSONConformance`` that enables comprehensive
  BSON checks.

Starting in MongoDB 8.3, the ``validate`` command and ``db.collection.validate()``
method check collections to ensure a collection doesn't have any documents that
exceed 16 MB. 
