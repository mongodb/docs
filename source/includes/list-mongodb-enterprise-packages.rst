Packages
--------

MongoDB provides officially supported Enterprise packages in their own
repository. This repository contains the following packages:

- ``mongodb-enterprise``

  This package is a ``metapackage`` that will automatically install
  the four component packages listed below.

- ``mongodb-enterprise-server``

  This package contains the :binary:`~bin.mongod` daemon and associated
  configuration and init scripts.

- ``mongodb-enterprise-mongos``

  This package contains the :binary:`~bin.mongos` daemon.

- ``mongodb-enterprise-shell``

  This package contains the :binary:`~bin.mongo` shell.

- ``mongodb-enterprise-tools``

  This package contains the following MongoDB tools: :binary:`~bin.mongoimport`
  :binary:`~bin.bsondump`, :binary:`~bin.mongodump`, :binary:`~bin.mongoexport`,
  :binary:`~bin.mongofiles`, :binary:`~bin.mongoimport`, :binary:`~bin.mongooplog`,
  :binary:`~bin.mongoperf`, :binary:`~bin.mongorestore`, :binary:`~bin.mongostat`,
  and :binary:`~bin.mongotop`.

Init Scripts
------------

The ``mongodb-enterprise`` package includes various :term:`init scripts
<init script>`, including the init script ``/etc/rc.d/init.d/mongod``.

The package configures MongoDB using the ``/etc/mongod.conf`` file in
conjunction with the init scripts. See
the :doc:`Configuration File </reference/configuration-options>`
reference for documentation of settings available in the configuration file.

As of version |release|, there are no init scripts for
:binary:`~bin.mongos`. The :binary:`~bin.mongos` process is used only in
:doc:`sharding </core/sharding>`. You can use the ``mongod`` init script
to derive your own :binary:`~bin.mongos` init script.
