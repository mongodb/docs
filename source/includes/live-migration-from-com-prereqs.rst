- Upgrade the source cluster to MongoDB 4.0 or later.
- :doc:`Create an Atlas Account </tutorial/create-atlas-account>`.
- :ref:`Create an Atlas organization <create-organization>` and
  then :ref:`create a project <create-project>` in this organization.
- Ensure that you have the |service| :authrole:`Organization Owner` role.
- :doc:`Deploy your cluster </tutorial/create-new-cluster>` in this project.
- :ref:`Connect to your cluster <connect-mongo-shell>`
  from all client servers where your applications run.
- On your source cluster in |com|, prepare the following items:

  - :opsmgr:`Provision a migration host
    </tutorial/provision-migration-host>` in Ops Manager, or
    :cloudmgr:`provision a migration host
    </tutorial/provision-migration-host>` in |mms|.

  - Obtain the following external IP addresses from your |com| administrator:

    - If migrating from |onprem|, the external IP addresses or |cidr| blocks
      of the |onprem| instances. If migrating from |mms|, |service|
      automatically obtains these addresses.
    - The external IP addresses or |cidr| blocks of the provisioned
      migration hosts in |com|.

  - The username and password used to connect to the source cluster.
  - If the source cluster uses |tls-ssl| with a Custom Root
    Certificate Authority (CA), to ensure the hosts can read the
    certificate, add the source cluster's
    :abbr:`CA (Certificate Authority)` file to the migration hosts.
  - If you migrate a sharded source cluster with a
    :manual:`sharded load balancer </core/sharding-balancer-administration#std-label-sharding-balancing>`,
    :opsmgr:`disable sharded collection management
    </tutorial/manage-data-sharding/#disable-sharded-collection-management>`
    in Ops Manager, or :cloudmgr:`disable sharded collection management
    </tutorial/manage-data-sharding/#disable-sharded-collection-management>`
    in |mms|. If you don't disable the sharded load balancer, the Live Migration
    process might fail.
