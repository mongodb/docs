.. important::

   :abbr:`Windows (Microsoft Windows)` does not support the ``saslauthd``
   daemon. MongoDB servers running version 3.2 or prior cannot connect to an
   LDAP server for authentication. You cannot apply this tutorial to a MongoDB
   server running on :abbr:`Windows (Microsoft Windows)`.
   
   MongoDB 3.4 or later supports binding to an LDAP server via system
   libraries for :ref:`LDAP authentication <security-ldap>` or :ref:`LDAP
   authorization <security-ldap-external>`. To configure a MongoDB 3.4
   deployment running on :abbr:`Windows (Microsoft Windows)` for LDAP proxy
   authentication, see
   :doc:`/tutorial/authenticate-nativeldap-activedirectory`.
