Until you've called :ref:`c2c-api-commit` on ``mongosync`` and ``canWrite`` successfully 
returns ``true``, the migrated collections on the destination cluster cannot be used to accept 
application read or write traffic. Do not use ``mongosync`` to maintain secondary clusters for Disaster Recovery,
Analytics, or other similar use cases.