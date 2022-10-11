- Upgrade the source {+cluster+} to MongoDB 4.2 or later.
- :doc:`Create an Atlas Account </tutorial/create-atlas-account>`.
- :ref:`Create an Atlas organization <create-organization>` and
  then :ref:`create a project <create-project>` in this organization.
- Ensure that you have the |service| :authrole:`Organization Owner` role.
- :doc:`Deploy your cluster </tutorial/create-new-cluster>` in this project.
- :ref:`Connect to your cluster <connect-mongo-shell>`
  from all client servers where your applications run.
- If migrating from |onprem|, upgrade |onprem| to version 5.0.
- .. include:: /includes/fact-migrate-drop-geoHaystack.rst
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
    between each migration host and the target |service| {+cluster+} on
    the same cloud provider as the target {+cluster+}.

    .. note::

       If you choose not to use VPC peering, the live migration process
       runs over public IP addresses that you add to the |service|
       project's :ref:`IP access list <access-list>` as part of the live
       migration procedure.

  - If you migrate a sharded source {+cluster+} with a
    :manual:`sharded load balancer </core/sharding-balancer-administration#std-label-sharding-balancing>`,
    perform one of the following tasks based on how you manage or monitor
    your source {+cluster+}:

    - If you manage the source {+cluster+} in |onprem|,
      :opsmgr:`disable sharded collection management
      </tutorial/manage-data-sharding/#disable-sharded-collection-management>`
      in |onprem|.

    - If you manage the source {+cluster+} in |mms|, :cloudmgr:`disable
      sharded collection management
      </tutorial/manage-data-sharding/#disable-sharded-collection-management>`
      in |mms|.

    - If you use |mms| to only monitor (but not manage) the source
      {+cluster+}, run :method:`sh.stopBalancer() <sh.stopBalancer>` on
      each |mongos| in a sharded cluster.

    If you don't disable (or stop, in case of the cluster monitored in |mms|)
    the load balancer, the live migration process might fail.
