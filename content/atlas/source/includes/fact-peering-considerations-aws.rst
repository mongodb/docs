Considerations
~~~~~~~~~~~~~~

DNS Configuration
`````````````````

|dns| resolves the cluster's hostnames to their public |ipaddr|
address rather than their internal |ipaddr| address if:

- :guilabel:`DNS hostnames` are disabled,
- :guilabel:`DNS resolution` is disabled, and
- The user accesses the |service| cluster from outside a peered
  :ref:`VPC <security-vpc>`.

To learn more about how to enable these options, see
:aws:`Updating DNS Support for Your VPC </AmazonVPC/latest/UserGuide/vpc-dns.html#vpc-dns-updating>`.

|aws| supports standard connection strings for configuring peering.
Use a private connection string only if the applications
within |aws| use custom |dns| services.
For more information, see :ref:`VPC <security-vpc>` and read
:ref:`the Connection Strings FAQ <atlas-faq-custom-dns>`.

Deployments in Multiple Regions
```````````````````````````````

|service| deployments in multiple regions must have a peering
connection for each |service| region.

For example: If you have a |vpc| in Sydney and |service|
deployments in Sydney and Singapore, create two peering
connections.

AWS VPC Peering Prerequisites
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. include:: /includes/fact-aws-vpc-prereqs.rst

Configure Network Peering for an AWS-backed Cluster
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To configure |service| |vpc| peering for an |aws|\-backed
cluster:
