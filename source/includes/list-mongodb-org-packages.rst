Packages
--------

MongoDB provides packages of the officially supported MongoDB builds in
it's own repository. This repository provides the MongoDB distribution
in the following packages:

- ``mongodb-org``

  This package is a ``metapackage`` that will automatically install
  the four component packages listed below.

- ``mongodb-org-server``

  This package contains the :program:`mongod` daemon and associated
  configuration and init scripts.

- ``mongodb-org-mongos``

  This package contains the :program:`mongos` daemon.

- ``mongodb-org-shell``

  This package contains the :program:`mongo` shell.

- ``mongodb-org-tools``

  This package contains the following MongoDB tools: :program:`mongoimport`
  :program:`bsondump`, :program:`mongodump`, :program:`mongoexport`,
  :program:`mongofiles`, :program:`mongoimport`, :program:`mongooplog`,
  :program:`mongoperf`, :program:`mongorestore`, :program:`mongostat`,
  and :program:`mongotop`.

Control Scripts
---------------

The ``mongodb-org`` package includes various :term:`control scripts
<control script>`, including the init script |init-script-path|.

The package configures MongoDB using the ``/etc/mongod.conf`` file in
conjunction with the control scripts. See
:doc:`/reference/configuration-options` for documentation of the
configuration file.

As of version |release|, there are no control scripts for
:program:`mongos`. The :program:`mongos` process is used only in
:doc:`sharding </core/sharding>`. You can use the ``mongod`` init script
to derive your own :program:`mongos` control script.
