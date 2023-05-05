Configure network permissions for the following components:

Source Cluster Firewall Allows Traffic from Live Migration Server
`````````````````````````````````````````````````````````````````

Any firewalls for the source {+cluster+} must grant the MongoDB live migration
server access to the source {+cluster+}.

The |service| live migration process streams data through a
MongoDB-controlled live migration server. |service| provides the IP ranges
of the MongoDB live migration servers during the live migration process.
Grant these IP ranges access to your source {+cluster+}. This allows the
MongoDB live migration server to connect to the source {+clusters+}.

.. note:: 

    If your organization has strict network requirements 
    and you cannot enable the required network access 
    to MongoDB live migration servers,
    see :cloudmgr:`Live Migrate a Community Deployment to Atlas
    </tutorial/migrate-community-to-atlas/>`.

|service| Cluster Allows Traffic from Your Application Servers
``````````````````````````````````````````````````````````````

|service| allows connections to a {+cluster+} from hosts added to the
project :doc:`IP access list </security/ip-access-list>`. Add the IP
addresses or |cidr| blocks of your application hosts to the project IP
access list. Do this before beginning the migration procedure.

|service| temporarily adds the IP addresses of the MongoDB  migration
servers to the project IP access list. During the migration procedure,
you can't edit or delete this entry. |service| removes this entry once
the procedure completes.

To learn how to add entries to the |service| IP access list, see
:doc:`/security/ip-access-list`.
