Port on which ``mongod`` is running. Not required if you
are using an :guilabel:`SRV Record` to connect to
your MongoDB instance.

By default, a standalone ``mongod`` operates on port
``27017``. If you are connecting to a replica set, your port
may also be ``27018`` or ``27019``. For more information on
the default ports MongoDB operates on, see
:manual:`Default MongoDB Port </reference/default-mongodb-port/>`.

If you are not sure of the port where your ``mongod`` operates,
contact your Database Administrator for information.