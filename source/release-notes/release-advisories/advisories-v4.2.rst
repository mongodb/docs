Before upgrading |onprem| from 4.0 to 4.2, review the following
considerations:

Backup
~~~~~~

.. include:: /release-notes/release-advisories/advisories-v4.2-backup.rst

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

Automation
~~~~~~~~~~

The Version Manager has been removed. All versions now can be used and
|mms| internally determines which versions the {+mdbagent+} needs
to have available in its configuration. The ability to configure custom
builds has been retained.

Network
~~~~~~~

When using |onprem| in |ipv6|-only environments, any connections to the
internet must support dual-stack |ipv4|/|ipv6|. Further, IP
whitelisting supports |ipv4|-style addresses only. This will be
resolved in a future release in the |onprem| 4.2 series.

Kubernetes
~~~~~~~~~~

The containerization of |onprem| has been included as a beta release.
This beta release is unsupported for production use. The Backup Daemon
is not containerized.

When you use the |k8s-op-short| and upgrade |onprem|, upgrade to
|onprem| 4.2.1. If you must remain on 4.2.0, change to your Kubernetes
|k8s-statefulset| to restart your MongoDB Agents and trigger a
rolling restart of all the database pods. This issue doesn't exist in
|onprem| 4.2.1 or later.
