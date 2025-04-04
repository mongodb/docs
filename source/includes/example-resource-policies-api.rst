.. _restrict-cloud-provider: 

Restrict Cloud Provider
~~~~~~~~~~~~~~~~~~~~~~~

The following example prevents users from creating a {+cluster+} 
on |gcp|:

.. code::
    :copyable: true 
    :emphasize-lines: 5 

    {
       "name": "Policy Preventing GCP Clusters",
       "policies": [
           {
               "body": "forbid (principal, action == ResourcePolicy::Action::\"cluster.modify\", resource) when { context.cluster.cloudProviders.contains(ResourcePolicy::CloudProvider::\"gcp\") };"
            }
        ]
    }

The following example uses the ``unless`` clause to allow users to 
create {+clusters+} *only* on |gcp|:

.. code::
    :copyable: true 
    :emphasize-lines: 5 
               
    {
        "name": "Policy Allowing Only GCP Clusters",
        "policies": [
            {
               "body": "forbid(principal, action == ResourcePolicy::Action::\"cluster.modify\", resource) unless { context.cluster.cloudProviders == [ResourcePolicy::CloudProvider::\"gcp\"] };"
            }
        ]
    }

The following example uses the ``when`` clause to prevent users from  
creating or editing a {+cluster+} in the project with ID ``6217f7fff7957854e2d09179`` 
unless |gcp| is the only cloud provider:

.. code::
    :copyable: true 
    :emphasize-lines: 5
               
    {
        "name": "Policy Allowing Only GCP Clusters for One Project",
        "policies": [
            {
                "body": "forbid (principal, action == ResourcePolicy::Action::\"cluster.modify\", resource) when { resource in ResourcePolicy::Project::\"6217f7fff7957854e2d09179\" && context.cluster.cloudProviders == [ResourcePolicy::CloudProvider::\"gcp\"] };"
            }
        ]
    } 

The following example prevents modifications to the {+cluster+} with ID 
``3217e2gdf79a4c54e2d0827`` when |gcp| is the cloud provider:

.. code::
    :copyable: true 
    :emphasize-lines: 5
               
    {
        "name": "Forbid Modifications to Specific GCP Cluster",
        "policies": [
            {
                "body": "forbid (principal, action == ResourcePolicy::Action::\"cluster.modify\", resource) when { resource in ResourcePolicy::Project::\"65dcbf5ccd12a54df59a54e6\" && resource == ResourcePolicy::Cluster::\"670968dfc0a2297ef46bc02a\" && context.cluster.cloudProviders == [ResourcePolicy::CloudProvider::\"gcp\"]};"
            }
        ]
    }

.. _restrict-region: 

Restrict Cloud Provider Region
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following example prevents users from creating or editing a {+cluster+}
in the region ``aws:us-east-1``:

.. code::
    :copyable: true 
    :emphasize-lines: 5 

    {
        "name": "Prohibit Cluster Deployment in the US-EAST-1 Region",
        "policies": [
            {
                "body": "forbid (principal,action == ResourcePolicy::Action::\"cluster.modify\",resource) when {context.cluster.regions.contains(ResourcePolicy::Region::\"aws:us-east-1\")};"
            {
        ]
    }

The following example prevents users from creating a {+cluster+} 
in the region ``aws:us-west-1``:

.. code::
    :copyable: true 
    :emphasize-lines: 5 

    {
        "name": "Policy Preventing Clusters in AWS:us-west-1",
        "policies": [
            {
                "body": "forbid(principal, action == ResourcePolicy::Action::\"cluster.modify\", resource) when { context.cluster.regions.contains(ResourcePolicy::Region::\"aws:us-west-1\") };"
            }
        ]
    }

The following example prevents users from creating a {+cluster+} 
in the regions ``aws:us-east-1``, ``aws:us-west-1``, or ``azure:westeurope``:

.. code::
    :copyable: true 
    :emphasize-lines: 5 
          
    {
        "name": "Policy Preventing Clusters in 3 AWS Regions",
        "policies": [
            {
               "body": "forbid(principal, action == ResourcePolicy::Action::\"cluster.modify\", resource) when { context.cluster.regions.containsAny([ResourcePolicy::Region::\"aws:us-east-1\", ResourcePolicy::Region::\"aws:us-west-1\", ResourcePolicy::Region::\"azure:westeurope\"]) };"
            }
        ]
    }

The following example uses the ``unless`` clause to allow users to 
create {+clusters+} *only* in the regions ``aws:us-east-1`` and ``azure:westeurope``:

.. code::
    :copyable: true 
    :emphasize-lines: 5 

    {
        "name": "Policy Allowing Clusters Only in 2 AWS Regions",
        "policies": [
           {
              "body": "forbid(principal, action == ResourcePolicy::Action::\"cluster.modify\", resource) unless { [ResourcePolicy::Region::\"aws:us-east-1\", ResourcePolicy::Region::\"azure:westeurope\"].containsAll(context.cluster.regions) };"
            }
        ] 
    {

The following example uses the ``when`` clause to restrict users from 
editing the {+cluster+} with ID ``3217e2gdf79a4c54e2d0827`` 
in the regions ``aws:us-east-1`` and ``aws:us-west-1``:

.. code::
    :copyable: true 
    :emphasize-lines: 5

    {
        "name": "Policy Restricting Edits to One Cluster from 2 AWS Regions",
        "policies": [
            {
               "body": "forbid(principal, action == ResourcePolicy::Action::\"cluster.modify\", resource == ResourcePolicy::Cluster::\"3217e2gdf79a4c54e2d0827\") when { context.cluster.regions.containsAny([ResourcePolicy::Region::\"aws:us-east-1\",ResourcePolicy::Region::\"aws:us-west-1\"]) };"
            }
        ]
    }


.. _example-cedar-policy:

Restrict Cloud Provider and Region
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following example restricts |service| users from creating |service| {+clusters+} 
on |gcp|, or in the |aws| regions ``aws:us-east-1`` or ``aws:us-west-1``.

.. code::
   :copyable: true 
   :emphasize-lines: 3 

   {
     "name": "Policy Restricting All GCP Clusters and Some AWS Regions",
     "policies": [{"body": "forbid (principal,action == ResourcePolicy::Action::\"cluster.modify\", resource) when {context.cluster.cloudProviders.containsAny([ResourcePolicy::CloudProvider::\"gcp\"]) || context.cluster.regions.containsAny([ResourcePolicy::Region::\"aws:us-east-1\", ResourcePolicy::Region::\"aws:us-west-1\"])};"}]
   }

.. _restrict-ip-addresses: 

Restrict IP Addresses
~~~~~~~~~~~~~~~~~~~~~

The following example prevents users from editing a project 
from a wildcard IP (``0.0.0.0/0``):

.. code::
    :copyable: true 
    :emphasize-lines: 5 

    {
        "name": "Policy Restricting Wildcard IP",
        "policies": [
            {
               "body": "forbid(principal, action == ResourcePolicy::Action::\"project.ipAccessList.modify\", resource) when { context.project.ipAccessList.contains(ip(\"0.0.0.0/0\")) };"
            }
        ]
    }

The following example uses the ``unless`` clause to allow users to 
edit projects *only* from the IP addresses ``1.2.3.4/32``, ``8.8.8.8/32``, 
and ``4.4.4.4/32``:

.. code::
    :copyable: true 
    :emphasize-lines: 5 

    {
        "name": "Policy Restricting Project Edits to Specified IPs",
        "policies": [
           {
               "body": "forbid(principal, action == ResourcePolicy::Action::\"project.ipAccessList.modify\", resource) unless { [ip(\"1.2.3.4/32\"), ip(\"8.8.8.8/32\"), ip(\"4.4.4.4/32\")].containsAll(context.project.ipAccessList) };"
            }
        ]
    }

The following example ensures that all traffic to the {+cluster+} is prohibited 
over public networks by requiring the IP access list to be empty.

.. code::
    :copyable: true 
    :emphasize-lines: 5 

    {
        "name": "Policy Preventing Access Over Public Networks",
        "policies": [
           {
               "body": "forbid (principal, action == ResourcePolicy::Action::\"project.ipAccessList.modify\", resource) unless {context.project.ipAccessList.isEmpty() };"
            }
        ]
    }

.. _restrict-cluster-tier: 

Restrict {+Cluster+} Tier Sizes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following example uses the ``when`` clause to restrict |service| from
provisioning or scaling  {+clusters+} to less than ``M30`` or greater than ``M60``:
        
.. note::

    This policy doesn't restrict {+clusters+} with a :ref:`cluster class <storage-class-ui>` of  **Low CPU** or **NVMe SSD**.

.. code::
    :copyable: true
    :emphasize-lines: 5

    {
        "name": "Policy Restricting Min/Max Cluster Size",
        "policies": [
            {
                "body": "forbid(principal, action == ResourcePolicy::Action::"cluster.modify", resource) when { (context.cluster has minGeneralClassInstanceSizeValue && context.cluster.minGeneralClassInstanceSizeValue < 30) || (context.cluster has maxGeneralClassInstanceSizeValue && context.cluster.maxGeneralClassInstanceSize > 60) };"
            }
        ]  
    }

.. _require-maintenance-window: 

Require Project Maintenance Windows
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following example requires that a project has a :ref:`maintenance window <configure-maintenance-window>` configured:

.. code::
    :copyable: true
    :emphasize-lines: 5

    {
        "name": "Policy Enforcing Existence of a Project Maintenance Window",
        "policies": [
            {
                "body": "forbid (principal, action == ResourcePolicy::Action::"project.maintenanceWindow.modify", resource) when {context.project.hasDefinedMaintenanceWindow == false};"
            }
        ]  
    } 

.. _prevent-peering-modifications:

Prevent Modifications to Network Peering
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following example prevents modifications to |vpc| peering connections across 
different cloud providers (|aws|, |gcp|, |azure|).

Each cloud provider requires different details for |vpc| peering. Gather the following
details for your cloud provider and replace them in the example:

**AWS:** ``aws:<AWS_ACCOUNT_ID>:<VPC_ID>:<VPC_CIDR>``

- ``AWS_ACCOUNT_ID``: Your |aws| account number.
- ``VPC_ID``: The ID of the |vpc|.
- ``VPC_CIDR``: The |cidr| block of the |vpc|.

**Azure:** ``azure:<SUBSCRIPTION_ID>:<RESOURCE_GROUP_NAME>:<VNET_NAME>``

- ``SUBSCRIPTION_ID``: Your |azure| subscription ID.
- ``RESOURCE_GROUP_NAME``: The resource group in which your Virtual Network (VNet) exists.
- ``VNET_NAME``: The name of your VNet.

**Google Cloud:** ``gcp:<GCP_PROJECT_ID>:<VPC_NAME>``

- ``GCP_PROJECT_ID``: The ID of your |gcp| project.
- ``VPC_NAME``: The name of the |vpc| in |gcp|.

.. code::
    :copyable: true
    :emphasize-lines: 5

    {
        "name": "Policy Preventing Modifications to Peering Across Providers",
        "policies": [
            {
                "body": "forbid (principal, action == ResourcePolicy::Action::\"project.vpcPeering.modify\", resource) when {context.project.peeringConnections == [\"aws:000123456789:us-east-1:vpc-0316c47cc923ce313:10.0.0.0/16\", \"azure:fd01aafc-b3re-2193-8497-83lp3m83a1a5:rg-name:vnet\", \"gcp:inductive-cocoa-108200:default\"]};"
            }
        ]  
    } 

.. _prevent-private-endpoint-modifications:

Prevent Modifications to Private Endpoints
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following example prevents modifications to private endpoint connections across 
cloud providers (|aws|, |gcp|, |azure|).

Each cloud provider requires different details for private endpoints. Gather the 
following details for your cloud provider and replace them in the example:

**AWS:** ``aws:<VPC_ENDPOINT_ID>``

- ``VPC_ENDPOINT_ID``: The ID of the |aws| |vpc| endpoint.

**Azure:** ``azure:<PRIVATE_ENDPOINT_RESOURCE_ID>:<PRIVATE_ENDPOINT_IP_ADDRESS>``

- ``PRIVATE_ENDPOINT_RESOURCE_ID``: The full resource ID path of the |azure| private endpoint.
- ``PRIVATE_ENDPOINT_IP_ADDRESS``: The IP address assigned to the private endpoint.

**Google Cloud:** ``gcp:<GCP_PROJECT_ID>:<VPC_NAME>``

- ``GCP_PROJECT_ID``: The ID of your |gcp| project.
- ``VPC_NAME``: The name of the |vpc| in |gcp| associated with the connection.

.. code::
    :copyable: true
    :emphasize-lines: 5

    {
        "name": "Policy Preventing Modifications to Private Endpoints Across Providers",
        "policies": [
            {
                "body": "forbid (principal, action == ResourcePolicy::Action::\"project.privateEndpoint.modify\", resource) when {context.project.privateEndpoints == [\"aws:vpce-042d72ded1748f314\", \"azure:/subscriptions/fd01aafc-b3re-2193-8497-83lp3m83a1a5/resourceGroups/rg-name/providers/Microsoft.Network/privateEndpoints/pe-name:10.0.0.4\", \"gcp:inductive-cocoa-108200:default\"]};"
            }
        ]  
    } 

.. _restrict-tls-api:

Restrict |tls| Protocol and Cipher Suites
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following example restricts the minimum |tls| version that your {+cluster+}
accepts for incoming connections to |tls| 1.2. 

Possible values for ``minTLSVersion`` include:

* **TLS 1.0**: ``ResourcePolicy::TLSVersion::\"tls1_0\"``
* **TLS 1.1**: ``ResourcePolicy::TLSVersion::\"tls1_1\"``
* **TLS 1.2**: ``ResourcePolicy::TLSVersion::\"tls1_2\"``

.. code::
    :copyable: true
    :emphasize-lines: 5

    {
        "name": "Policy Restricting Cluster Connections to Minimum TLS 1.2",
        "policies": [
            {
                "body": "forbid (principal, action == ResourcePolicy::Action::\"cluster.modify\", resource)unless {context.cluster.minTLSVersion == ResourcePolicy::TLSVersion::\"tls1_2\"};"
            }
        ]  
    } 

The following example requires that {+clusters+} use the custom |tls| cipher suite configuration 
``TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384`` by setting ``ResourcePolicy::CipherConfigMode::\"custom\"``.

Possible values for custom |tls| cipher suite configurations are:

* ``ResourcePolicy::CipherSuite::\"TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384\"``
* ``ResourcePolicy::CipherSuite::\"TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256\"``

.. code::
    :copyable: true
    :emphasize-lines: 5

    {
        "name": "Policy Requiring Specific TLS Cipher Suite",
        "policies": [
            {
                "body": "forbid (principal, action == ResourcePolicy::Action::\"cluster.modify\", resource) unless {context.cluster.cipherConfigMode == ResourcePolicy::CipherConfigMode::\"custom\" && context.cluster.cipherSuites == [ResourcePolicy::CipherSuite::\"TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384\"]};"
            }
        ]  
    } 

The following example requires that {+clusters+} use the default |tls| cipher suite configuration.

.. code::
    :copyable: true
    :emphasize-lines: 5

    {
        "name": "Policy Requiring Default TLS Cipher Suite",
        "policies": [
            {
                "body": "forbid (principal, action == ResourcePolicy::Action::\"cluster.modify\", resource) unless {context.cluster.cipherConfigMode == ResourcePolicy::CipherConfigMode::\"default\"};"
            }
        ]
    }
