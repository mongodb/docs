The MongoDB instance stores its data files in ``/var/lib/mongo``
and its log files in ``/var/log/mongodb`` by default,
and runs using the ``mongod``
user account. You can specify alternate log and data file
directories in ``/etc/mongodb.conf``; see
:doc:`/reference/configuration-options` for details.

If you change the user that runs the MongoDB process, you
**must** modify the access control rights to the ``/var/lib/mongo`` and
``/var/log/mongodb`` directories, e.g. by running

.. code-block:: sh

   chown -R <username of new user> /var/lib/mongo
   chown -R <username of new user> /var/log/mongodb

as a user with appropriate privileges.
