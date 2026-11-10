By default, MongoDB instance stores:

- its data files in |mongod-datadir|

- its log files in ``/var/log/mongodb`` 

If you installed via the package manager, these default directories are
created during the installation.

If you installed manually by downloading the tarballs, you can create
the directories using ``mkdir -p <directory>`` or ``sudo mkdir -p
<directory>`` depending on the user that will run MongoDB. (See your
linux man pages for information on ``mkdir`` and ``sudo``.)

By default, MongoDB runs using the |mongod-user| user account. If you
change the user that runs the MongoDB process, you **must** also modify
the permission to the |mongod-datadir| and ``/var/log/mongodb``
directories to give this user access to these directories.

To specify a different log file directory and data file directory, edit
the :setting:`systemLog.path` and :setting:`storage.dbPath` settings in
the ``/etc/mongod.conf``. Ensure that the user running MongoDB has
access to these directories.
