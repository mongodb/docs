.. This file is a cache of content removed from the public docs in
   DOCSP-64125. It is preserved here to provide a source of truth for
   work on DOCSP-64122.

Directory Paths
~~~~~~~~~~~~~~~

To Use Default Directories
``````````````````````````

.. include:: /includes/deploy/dirs.rst

To Use Non-Default Directories
``````````````````````````````

To use a data directory or log directory other than the default
directories:

#. Create the new directory or directories.

#. Edit the configuration file ``/etc/mongod.conf`` and modify the
   following fields:

   - :setting:`storage.dbPath` to specify a new data directory path
     (for example, ``/some/data/directory``)

   - :setting:`systemLog.path` to specify a new log file path
     (for example, ``/some/log/directory/mongod.log``)

#. Ensure that the user running MongoDB has access to the directory or
   directories:

   .. code-block:: bash

      sudo chown -R mongod:mongod <directory>

   If you change the user that runs the MongoDB process, you **must**
   give the new user access to these directories.

#. Configure SELinux if enforced. See :ref:`install-rhel-configure-selinux`.


