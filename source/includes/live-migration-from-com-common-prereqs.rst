- While the :ref:`supported migration paths <lm-upgrade-path>` allow you
  to migrate from a source {+cluster+} on MongoDB 4.0 or 4.2 to a {+cluster+}
  in |service|, we highly recommend that before you use this procedure,
  you upgrade the source {+cluster+} to MongoDB 4.4 or later.
- :ref:`Create an Atlas Account <create-atlas-account>`.
- :ref:`Create an Atlas organization <create-organization>` and
  then :ref:`create a project <create-project>` in this organization.
- Ensure that you have the |service| :authrole:`Organization Owner` role.
- :ref:`Deploy your cluster <create-new-cluster>` in this project.
- :ref:`Connect to your cluster <connect-mongo-shell>`
  from all client servers where your applications run.
- If migrating from |onprem|, upgrade |onprem| to version 5.0.
- .. include:: /includes/fact-migrate-drop-geoHaystack.rst
- .. include:: /includes/fact-migrate-enable-collect-dbstats.rst
- On your source {+cluster+}  in |com|, prepare the following items:

  - :opsmgr:`Provision a migration host
    </tutorial/provision-migration-host>` in |onprem|, or
    :cloudmgr:`provision a migration host
    </tutorial/provision-migration-host>` in |mms|.

  - Obtain the following external IP addresses from your |com| administrator:

    - If migrating from |onprem|, the external IP addresses or |cidr| blocks
      of the |onprem| instances. If migrating from |mms|, |service|
      automatically obtains these addresses.
    - The external IP addresses or |cidr| blocks of the provisioned
      migration hosts in |com|.

  - The username and password used to connect to the source {+cluster+}.
  - If the source {+cluster+} uses |tls-ssl| with a Custom Root |certauth|,
    to ensure the hosts can read the certificate, add the source
    {+cluster+}'s :abbr:`CA (Certificate Authority)` file to the
    migration hosts.

  - Consider configuring a :ref:`VPC peering connection <vpc-peering>`
    or a :ref:`private endpoint <private-endpoint>` between each
    migration host and the destination |service| {+cluster+} on the same cloud
    provider and in the same region as the destination {+cluster+}.

    .. note::

       If you choose not to use VPC peering or private endpoints, the
       live migration process runs over public IP addresses that you add
       to the |service| project's :ref:`IP access list <access-list>` as
       part of the live migration procedure.

