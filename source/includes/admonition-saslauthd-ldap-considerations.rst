.. include:: /includes/admonition-mongodb-enterprise-windows-ldap.rst

MongoDB does **not** support LDAP authentication in mixed sharded
cluster deployments that contain both version 2.4 and version 2.6
shards. See :doc:`/release-notes/2.6-upgrade` for upgrade instructions.

Use secure encrypted or trusted connections between clients and the server,
as well as between ``saslauthd`` and the LDAP server. The LDAP server uses
the ``SASL PLAIN`` mechanism, sending and receiving data in **plain text**. 
You should use only a trusted channel such as a VPN, a connection encrypted 
with SSL, or a trusted wired network.
