Before upgrading |onprem| from 4.0 to 4.2, review the following
considerations:

.. _om-upgrade-con-backup:

Backup
~~~~~~

.. include:: /release-notes/release-advisories/advisories-v4.2-backup.rst

.. _om-upgrade-con-backingdb:

Backing Databases
~~~~~~~~~~~~~~~~~

Consider converting your backing databases to use the
:manual:`WiredTiger storage engine </core/wiredtiger>`. |onprem|
supports :ref:`MongoDB 4.0.x and 4.2.x <requirements-backing-db-replica-sets>`. MongoDB 4.2
:manual:`removed the MMAPv1 storage engine </release-notes/4.2-compatibility#removal-of-mmapv1-storage-engine>`.

.. _om-upgrade-con-agent:

MongoDB Agent
~~~~~~~~~~~~~

- MongoDB Agent doesn't support automation of MongoDB 2.6 and 3.0.

- Customers using Kerberos (``GSSAPI``) authentication for unmanaged
  Monitoring and/or Backup Agents must create a single new |gssapi|
  principal for the combined MongoDB Agent.

- MongoDB Agent doesn't support the
  ``sslRequireValidServerCertificates`` parameter. You can no
  longer use the workaround of manually managed Monitoring and Backup
  Agents.

.. _om-upgrade-con-auto:

Automation
~~~~~~~~~~

The Version Manager has been removed. All versions now can be used and
|mms| internally determines which versions the {+mdbagent+} needs
to have available in its configuration. The ability to configure custom
builds has been retained.

.. _om-upgrade-con-net:

Network
~~~~~~~

When using |onprem| in |ipv6|-only environments, any connections to the
internet must support dual-stack |ipv4|/|ipv6|. 

.. _om-upgrade-con-k8s:

Kubernetes
~~~~~~~~~~

The containerization of |onprem| has been included as a beta release.
This beta release is unsupported for production use. The Backup Daemon
is not containerized.

When you use the |k8s-op-short| and upgrade |onprem|, upgrade to
|onprem| 4.2.1. If you must remain on 4.2.0, change to your Kubernetes
|k8s-statefulset| to restart your MongoDB Agents and trigger a
:term:`rolling restart` of all the database pods. This issue doesn't 
exist in |onprem| 4.2.1 or later.

.. _om-upgrade-con-release-date:

Upgrade Versions in Chronological Order
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When you upgrade to another version, make sure the new version has a
``release_date`` that was released after the date of the version you
want to upgrade. You might have this issue when upgrading from the
current version ({+manifest-version+}) to rapid release
({+rr-version+}) version. In this case, the version numbers don't
correspond to release dates.

.. example::

   - MongoDB released |onprem| 4.3.5 on 16 Jan 2020, but released
     |onprem| 4.2.8 on 06 Feb 2020. You *can't* upgrade |onprem| from
     4.2.8 to 4.3.5.

   - MongoDB released |onprem| 4.3.7 on 27 Feb 2020. You *can* upgrade
     |onprem| from 4.2.8 to 4.3.7.

To find the release dates, download the
`ops_manager_release_archive JSON file <https://info-mongodb-com.s3.amazonaws.com/com-download-center/ops_manager_release_archive.json>`__.
Search for ``version`` to find the |onprem| versions to and from which
you are upgrading.
