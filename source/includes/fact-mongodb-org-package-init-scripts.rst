The ``mongodb-org`` package includes various :term:`init scripts
<init script>`, including the init script |init-script-path|. You can use these
scripts to stop, start, and restart daemon processes.

The package configures MongoDB using the ``/etc/mongod.conf`` file in
conjunction with the init scripts. See
the :doc:`Configuration File </reference/configuration-options>`
reference for documentation of settings available in the configuration file.

There are no init scripts for :binary:`~bin.mongos`. You can use the ``mongod``
init script to derive your own :binary:`~bin.mongos` init script for use in such
environments. See the :binary:`~bin.mongos` reference for configuration details.
