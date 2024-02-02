If your connection string specifies ``"srv:<DNS_NAME>"``, |ldap-binary|
verifies that ``"_ldap._tcp.gc._msdcs.<DNS_NAME>"`` exists for SRV to
support Active Directory. If not found, |ldap-binary| verifies that
``"_ldap._tcp.<DNS_NAME>"`` exists for SRV. If an SRV record cannot be
found, |ldap-binary| warns you to use ``"srv_raw:<DNS_NAME>"`` instead.

If your connection string specifies ``"srv_raw:<DNS_NAME>"``,
|ldap-binary| performs an SRV record lookup for ``"<DNS NAME>"``.
