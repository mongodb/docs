======================
Backup Agent Changelog
======================

.. default-domain:: mongodb

Backup Agent ``1.5.1.83-1``
---------------------------

*Released with MMS OnPrem 1.4.2*

Critical bug fix for backing up MongoDB 2.6 deployments that include
user definitions. The system.version and system.role collections from
the admin database are now included in the initial data sync.

Backup Agent ``1.5.0.57-1``
---------------------------

*Released with OnPrem 1.4.1*

Support for backing up Kerberos-authenticated replica sets and clusters

Backup Agent ``1.4.6.42-1``
---------------------------

*Released with OnPrem 1.4.0*

- Major stability update.

- Prevent a file descriptor leak.

- Correct handling of timeouts for connections hung in the SSL
  handshaking phase.
