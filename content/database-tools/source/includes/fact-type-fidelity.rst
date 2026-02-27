If you need to preserve all rich :term:`BSON` data types when using
:binary:`~bin.mongoexport` to perform full instance backups,
specify :ref:`Extended JSON v2.0 (Canonical mode) <mongodb-extended-json-v2>` 
to the :option:`--jsonFormat <mongoexport --jsonFormat>` option:

.. code-block:: javascript

   mongoexport --jsonFormat=canonical --collection=<coll> <connection-string>

If you don't specify ``--jsonFormat``, :binary:`~bin.mongoexport` outputs data 
in :ref:`Extended JSON v2.0 (Relaxed mode) <mongodb-extended-json-v2>` by 
default.

:binary:`~bin.mongoimport` automatically uses the :term:`JSON`
format found in the specified target data file when restoring. For
example, if the target data export file was created by :binary:`~bin.mongoexport` 
with ``--jsonFormat=canonical`` specified, it uses Canonical mode).
