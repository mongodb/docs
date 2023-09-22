In MongoDB versions earlier than 6.2, this field is included in the
``config.version`` collection, but in ``mongosh`` 2.0.0 and later, the
field is not returned in the ``sh.status()`` output. Starting in MongoDB
6.2, this field is removed and not returned in any ``mongosh`` version
or other client application. Instead, to obtain version information, see
the :ref:`feature compatibility version (fcv) <view-fcv>`.
