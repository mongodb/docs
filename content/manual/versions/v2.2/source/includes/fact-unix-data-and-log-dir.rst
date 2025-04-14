The MongoDB instance stores its data files in the ``/var/lib/mongo``
and its log files in ``/var/log/mongo``, and run using the ``mongod``
user account. If you change the user that runs the MongoDB process, you
**must** modify the access control rights to the ``/var/lib/mongo`` and
``/var/log/mongo`` directories.
