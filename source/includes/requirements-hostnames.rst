Use resolvable hostnames
~~~~~~~~~~~~~~~~~~~~~~~~

Each Agent and |mms| instance must be able to resolve the hostname for
each server hosting a MongoDB instance or |mms| agent.

On each server, set their hostnames to fully qualified domain names
(FQDN) whenever possible. Consult the documentation for your operating
system as to how to find and set the hostname as an FQDN.

Setting the FQDN on each server helps you know which server you are
using when logged into that server. To enable other servers to know
what the other servers' hostnames are, you need to provide a way for
those servers to resolve hostnames.

There are two ways to configure hostname resolution. 

Use a Domain Name Service
`````````````````````````

To make the servers' hostnames resolvable, run a server
with a domain name service (DNS). DNS maps IP addresses to
hostnames with a given domain (such as ``example.com``). This DNS
server should have an entry for each server in the deployment: |mms|,
|mms| agent and MongoDB. Entries for LDAP, Kerberos, SNMP and email
servers as well as load balancers would be recommended.

Edit Host Files
```````````````

If a DNS setup is not possible, add entries for each server in the
``hosts`` file of each system.

.. list-table:: Locations of ``hosts`` files
   :header-rows: 1
   :widths: 20,80

   * - Operating System
     - ``hosts`` Location

   * - Linux
     -
      .. code-block:: sh

         /etc/hosts

   * - Mac OS X
     -
      .. code-block:: sh

         /private/etc/hosts

   * - Windows
     -
      .. code-block:: powershell

         %SystemRoot%\System32\drivers\etc\hosts

      This normally resolves to:

      .. code-block:: powershell

         C:\Windows\System32\drivers\etc\hosts

The ``hosts`` file is a root-readable plain text and must be edited
with ``root`` or ``Administrator`` permissions. The entry format is
written as:

.. code-block:: ini

   127.0.0.1   localhost
   10.15.0.5   opsmgr.example.dev
   10.15.10.15 rs1.example.dev
   10.15.10.16 rs2.example.dev
   10.15.10.17 rs3.example.dev


