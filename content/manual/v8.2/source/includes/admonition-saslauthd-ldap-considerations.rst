- Linux MongoDB servers support binding to an LDAP server via the
  ``saslauthd`` daemon.

- Use secure encrypted or trusted connections between clients and the
  server, as well as between ``saslauthd`` and the LDAP server. The
  LDAP server uses the ``SASL PLAIN`` mechanism, sending and receiving
  data in **plain text**. You should use only a trusted channel such as
  a VPN, a connection encrypted with TLS/SSL, or a trusted wired
  network.
