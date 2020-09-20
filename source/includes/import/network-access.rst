Network Access
~~~~~~~~~~~~~~

Configure network permissions for the following components:

Source Cluster Firewall Allows Traffic from Live Migration Server
`````````````````````````````````````````````````````````````````

Any firewalls for the source cluster must grant the live migration
server access to the source cluster.

The |service| Live Migration process streams data through a
MongoDB-controlled application server. |service| provides the IP ranges
of the MongoDB Live Migration servers during the Live Migration
process. Grant these IP ranges access to your source cluster. This
allows the MongoDB Live Migration server to connect to the source
clusters.

|service| Cluster Allows Traffic from Your Application Servers
``````````````````````````````````````````````````````````````

|service| allows connections to a cluster from hosts added to the
project :doc:`IP access list </security/ip-access-list>`. Add the IP
addresses or |cidr| blocks of your application hosts to the project IP
access list. Do this before beginning the migration procedure.

|service| temporarily adds the IP addresses of the |service| migration
servers to the project IP access list. During the migration procedure,
you can't edit or delete this entry. |service| removes this entry once
the procedure completes.

To learn how to add entries to the |service| IP access list, see
:doc:`/security/ip-access-list`.
