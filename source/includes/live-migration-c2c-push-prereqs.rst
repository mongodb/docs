- Upgrade the source cluster to MongoDB version 6.0 or later.
- :ref:`Create an Atlas Account <create-atlas-account>`.
- :ref:`Create an Atlas organization <create-organization>` and
  then :ref:`create a project <create-project>` in this organization.
- :ref:`Deploy your cluster <create-new-cluster>` in this project.
- :ref:`Connect to your cluster <connect-mongo-shell>`
  from all client servers where your applications run.

- Consider configuring a :ref:`VPC peering connection <vpc-peering>` or
  a :ref:`private endpoint <private-endpoint>` between each migration host
  and the destination |service| {+cluster+} on the same cloud provider
  and in the same region as the destination {+cluster+}.

  .. note::

     If you choose not to use VPC peering or private endpoints when
     migrating replica sets, the live migration process runs over
     public IP addresses that you add to the |service| project's
     :ref:`IP access list <access-list>` as part of the live migration
     procedure in this section.

- On your source {+cluster+} in |mms|, :cloudmgr:`provision a migration host
  </tutorial/provision-migration-host>` in |mms|.

  - The username and password used to connect to the source {+cluster+}.
  - If you aren't using a :ref:`private endpoint <private-endpoint>`
    between the migration host and the destination |service| {+cluster+},
    obtain the external IP addresses or |cidr| blocks of the provisioned
    migration hosts in |mms| from your |mms| administrator.
  - If the source {+cluster+} uses |tls-ssl| with a Custom Root |certauth|,
    to ensure the hosts can read the certificate, add the source
    {+cluster+}'s :abbr:`CA (Certificate Authority)` file to the
    migration hosts.

- .. include:: /includes/fact-migrate-c2c-push-enable-collect-dbstats.rst
