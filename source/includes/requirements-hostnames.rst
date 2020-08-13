Use resolvable hostnames
~~~~~~~~~~~~~~~~~~~~~~~~

Each {+mdbagent+} and |mms| instance must be able to resolve the
hostname for each host hosting a MongoDB instance or {+mdbagent+}.

On each host, set their hostnames to fully qualified domain names
(|fqdn|) whenever possible. Consult the documentation for your
operating system as to how to find and set the hostname as an |fqdn|.

Setting the |fqdn| on each host helps you know which host you are
using when logged into that host. To enable other hosts to know
what the other hosts' hostnames are, you need to provide a way for
those hosts to resolve hostnames.

There are two ways to configure hostname resolution.

Use a Domain Name Service
`````````````````````````

To make the hosts' hostnames resolvable, run a host with a domain name
service (|dns|). |dns| maps IP addresses to hostnames with a given
domain (such as ``example.com``). This |dns| host should have an entry
for each host in the deployment: |mms|, {+mdbagent+} and MongoDB.
Entries for |ldap|, Kerberos, |snmp| and email hosts as well as load
balancers would be recommended.

Edit Host Files
```````````````

If a |dns| setup is not possible, add entries for each host in the
``hosts`` file of each system.

.. list-table:: Locations of ``hosts`` files
   :header-rows: 1
   :widths: 20,80

   * - Operating System
     - ``hosts`` Location

   * - Linux
     -
      .. code-block:: sh
         :copyable: false

         /etc/hosts

   * - Mac OS X
     -
      .. code-block:: sh
         :copyable: false

         /private/etc/hosts

   * - Windows
     -
      .. code-block:: powershell
         :copyable: false

         %SystemRoot%\System32\drivers\etc\hosts

      This normally resolves to:

      .. code-block:: powershell
         :copyable: false

         C:\Windows\System32\drivers\etc\hosts

The ``hosts`` file is a root-readable plain text and must be edited
with ``root`` or ``Administrator`` permissions. The entry format is
written as:

.. code-block:: ini
   :copyable: false

   127.0.0.1   localhost
   10.15.0.5   opsmgr.example.dev
   10.15.10.15 rs1.example.dev
   10.15.10.16 rs2.example.dev
   10.15.10.17 rs3.example.dev

