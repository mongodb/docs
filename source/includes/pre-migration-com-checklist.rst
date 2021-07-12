Pre-Migration Checklist
~~~~~~~~~~~~~~~~~~~~~~~

Before starting this Live Migration procedure from |com| to |service|:

- If you don't already have a target cluster,
  :doc:`create </tutorial/create-new-cluster>` a new |service|
  deployment and test that you can :ref:`connect <connect-mongo-shell>`
  to it from all client servers where your applications run.

- On your source cluster in |com|, prepare the following items:

  - Provision a migration host in |com|.
  - Obtain the following external IP addresses from your |com| administrator:

    - The external IP addresses or |cidr| blocks of the |onprem|
      instances in the source cluster. If migrating from |mms|,
      |service| automatically obtains these addresses.
    - The external IP address of the provisioned migration host in |com|.

  - The username and password used to connect to the source cluster.
  - If the source cluster uses |tls-ssl| and is not using a
    public Certificate Authority (CA), the migration host must
    have access to the source cluster's :abbr:`CA (Certificate
    Authority)` file.