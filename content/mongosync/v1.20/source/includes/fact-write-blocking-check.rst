To see what state ``mongosync`` is in, call the :ref:`/progress
<c2c-api-progress>` API endpoint. The ``/progress`` output includes a
boolean value, ``canWrite``.

- When ``canWrite`` is ``true``, it is safe to write to the destination
  cluster.
- When ``canWrite`` is ``false``, do not write to the destination
  cluster.
