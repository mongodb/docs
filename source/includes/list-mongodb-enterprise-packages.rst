Packages
--------

MongoDB provides officially supported Enterprise packages in their own
repository. This repository contains the following packages:

- ``mongodb-enterprise``

  This package is a ``metapackage`` that will automatically install
  the four component packages listed below.

- ``mongodb-enterprise-server``

  This package contains the :program:`mongod` daemon and associated
  configuration and init scripts.

- ``mongodb-enterprise-mongos``

  This package contains the :program:`mongos` daemon.

- ``mongodb-enterprise-shell``

  This package contains the :program:`mongo` shell.

- ``mongodb-enterprise-tools``

  This package contains the following MongoDB tools: :program:`mongoimport`
  :program:`bsondump`, :program:`mongodump`, :program:`mongoexport`,
  :program:`mongofiles`, :program:`mongoimport`, :program:`mongooplog`,
  :program:`mongoperf`, :program:`mongorestore`, :program:`mongostat`,
  and :program:`mongotop`.

Init Scripts
------------

The ``mongodb-enterprise`` package includes various :term:`init scripts
<init script>`, including the init script ``/etc/rc.d/init.d/mongod``.

The package configures MongoDB using the ``/etc/mongod.conf`` file in
conjunction with the init scripts. See
the :doc:`Configuration File </reference/configuration-options>`
reference for documentation of settings available in the configuration file.

As of version |release|, there are no init scripts for
:program:`mongos`. The :program:`mongos` process is used only in
:doc:`sharding </core/sharding>`. You can use the ``mongod`` init script
to derive your own :program:`mongos` init script.
