Monitoring Agent
++++++++++++++++

Install and configure the |monitoring|, as described in the
:doc:`/tutorial/nav/monitoring-agent` documentation.

Firewall
++++++++

If your MongoDB instances operate within a firewall, configure your
network infrastructure to allow outbound connections on port ``443``
(SSL) to ``api-backup.mongodb.com``.

Access Control
++++++++++++++

If you use |backup| with a MongoDB deployment that uses authentication,
before installing the |backup| Agent, you must create a user in MongoDB
with the appropriate access. See
:doc:`/tutorial/nav/configure-backup-agent`.

Backup Directory
++++++++++++++++

.. include:: /includes/fact-backup-agent-install-directory.rst
