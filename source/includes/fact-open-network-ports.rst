Make sure your application can reach your |service-fullname|
environment. To add the inbound network access from your application environment to |service|, do one of the following:

1. Add the public IP addresses to your IP access list
2. Use :ref:`VPC / VNet peering <vpc-peering>` to add private IP
   addresses.

.. seealso:: :ref:`security-ip-access-list`

If your firewall blocks outbound network connections, you must also
open outbound access from your application environment to |service|.
You must configure your firewall to allow your applications to make
outbound connections to ports 27015 to 27017 to |tcp| traffic on
|service| hosts. This grants your applications access to databases
stored on |service|.

.. note::

   By default, |service-fullname| clusters do not need to be able to
   initiate connections to your application environments. If you wish
   to enable |service| clusters with
   :ref:`LDAP authentication and authorization <ldaps-authentication-authorization>`,
   you must allow network access from |service| clusters directly to
   your secure |ldap|. You can allow access to your |ldap| by using
   public or private IPs as long as a public |dns| hostname points to
   an IP that the |service| clusters can access.

If you are not using :ref:`VPC / VNet peering <vpc-peering>` and plan
to connect to |service| using public IP addresses, see the following
pages for additional information:

- :ref:`faq-atlas-side-hostnames`

- :ref:`faq-public-ip-changes`
