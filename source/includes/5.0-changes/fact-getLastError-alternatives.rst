Any code explicitly using ``getLastError``,  ``db.getLastError()``, or
``db.getLastErrorObj()`` should instead use the CRUD API to issue the
write with the desired :ref:`write concern <write-concern>`.
Information about the success or failure of the write operation will be
provided directly by the driver as a return value.

