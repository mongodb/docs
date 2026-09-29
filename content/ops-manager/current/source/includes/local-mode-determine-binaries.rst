Use this section to create a list of the binaries that you need
to store and download.

MongoDB Server
++++++++++++++

Find the MongoDB Server version required for your deployments,
including the required operating system, architecture, and Community
or Enterprise edition.

MongoDB provides :dl:`Community <community>` and
:dl:`Enterprise <enterprise>` installation binaries for all versions
on all :ref:`platforms <ops-manager-operating-system>` that |onprem|
supports. |onprem| stores these binaries as compressed ``.tgz``
archives for all platforms, except Windows, and as ``.zip`` archives
for Windows.

For local mode, you must download the ``.tgz`` or ``.zip`` binaries
for:

- Each platform and version that your current and planned MongoDB
  deployments run.

- Each platform and version along the
  :doc:`upgrade path </tutorial/upgrade-ops-manager>` of any existing
  MongoDB deployments you want to upgrade.

  .. note::

     If you download a binary archive using Microsoft Edge, the
     archive downloads with a ``.gz`` extension instead of a
     ``.tgz`` extension. Change this file's extension to ``.tgz``
     before you continue.

- If you are running backups, you need the MongoDB binary for the
  platform your |onprem| :opsmgr:`Backup Daemon
  </reference/glossary/#std-term-backup-daemon>` runs on.

  .. example::

     If you are running a MongoDB replica set on MongoDB 6.0 on a
     set of Ubuntu hosts and running |onprem| on Windows, you must
     download and store archived binaries of MongoDB 6.0 for Ubuntu
     (``.tgz``) and for Windows (``.zip``).

- If you are running :doc:`queryable backups
  </tutorial/query-backup>`, you need the Enterprise edition of the
  MongoDB version that your deployment runs.

  .. example::

     If you are running a MongoDB replica set on MongoDB 6.0 on a
     set of Ubuntu hosts and want to query backups from an |onprem|
     install on Windows, you must download and store archived
     binaries of MongoDB Community 6.0 for Ubuntu (``.tgz``) and
     MongoDB Enterprise 3.6.8 Windows (``.zip``).

MongoDB Database Tools
++++++++++++++++++++++

Find the Database Tools version that your |onprem| version requires
in the :ref:`Database Tools Compatibility table
<ops-manager-dbtools-compatibility>`. During |onprem| upgrades,
install the version listed for your new |onprem| release, since
newer Database Tools versions can break compatibility with your
release.

For each platform and version you must support, download the
:dl:`MongoDB Database Tools <database-tools>` in the ``.tgz`` format
into the :setting:`Versions Directory`. These tools include
:dbtools:`mongodump </mongodump>` and
:dbtools:`mongorestore </mongorestore>`.

.. note::

   .. include:: /includes/install/db-tools-separate-from-server.rst

   .. include:: /includes/install/use-agent-install-binaries.rst

MongoDB Shell
+++++++++++++

If you have |onprem| 7.0.5 or later, you can download {+mongosh+}.
Find the {+mongosh+} version that your |onprem| version uses. See the
:ref:`mms-changelog` to find what {+mongosh+} version your |onprem|
version uses. During |onprem| upgrades, verify that you have the
latest version that your new version of |onprem| uses.
