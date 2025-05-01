If you need to preserve all rich :term:`BSON` data types when using
:binary:`~bin.mongoexport` to perform full instance backups, be sure to
specify :manual:`Extended JSON v2.0 (Canonical mode)
</reference/mongodb-extended-json>` to the
:option:`--jsonFormat <mongoexport --jsonFormat>` option to
:binary:`~bin.mongoexport`, in the following fashion:

.. code-block:: javascript

   mongoexport --jsonFormat=canonical --collection=<coll> <connection-string>

If :option:`--jsonFormat <mongoexport --jsonFormat>` is unspecified,
:binary:`~bin.mongoexport` outputs data in
:manual:`Extended JSON v2.0 (Relaxed mode)
</reference/mongodb-extended-json>` by default.

:binary:`~bin.mongoimport` will automatically use the :term:`JSON`
format found in the specified target data file when restoring. For
example, it will use :manual:`Extended JSON v2.0 (Canonical mode)
</reference/mongodb-extended-json>` if the target data export file was
created by :binary:`~bin.mongoexport` with ``--jsonFormat=canonical``
specified.
