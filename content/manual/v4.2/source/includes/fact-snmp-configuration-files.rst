MongoDB Enterprise includes the following SNMP configuration files:

- ``MONGOD-MIB.txt``:

  The management information base (MIB) file that defines MongoDB's
  SNMP output. On Ubuntu and Debian platforms, this file is shipped
  compressed as ``MONGOD-MIB.txt.gz`` and must be decompressed with
  ``gunzip``.

- ``mongod.conf.subagent``:

  The configuration file to run |mongod-program| as the SNMP
  subagent. This file sets SNMP run-time configuration options,
  including the ``agentXSocket`` to connect to the SNMP master.

- ``mongod.conf.master``:

  The configuration file to run |mongod-program| as the SNMP
  master. This file sets SNMP run-time configuration options,
  including the ``agentaddress`` to run on.

The MongoDB SNMP configuration files are provided with your MongoDB
Enterprise installation, as follows:

- If you installed MongoDB Enterprise via a package manager, these files
  are installed to the following directory as part of the package
  installation process:

  .. list-table::
     :header-rows: 1
     :widths: 20 80

     * - **Platform**

       - **Path**

     * - RHEL / CentOS

       - ``/usr/share/doc/mongodb-enterprise-server-{+release+}``

     * - Ubuntu / Debian

       - ``/usr/share/doc/mongodb-enterprise-server``

     * - SUSE

       - ``/usr/share/doc/packages/mongodb-enterprise-server``

- If you installed MongoDB Enterprise from a ``.tgz`` tarball, these
  files were included in the tarball.
