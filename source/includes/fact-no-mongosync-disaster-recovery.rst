Until you've called :ref:`c2c-api-commit` on ``mongosync`` and ``canWrite`` successfully 
returns ``true``, the destination cluster cannot be used to accept 
application read or write traffic. 
Do not use ``mongosync`` for maintaining Disaster Recovery clusters.