.. _atlas_20210126:

26 January 2021 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Introduces private network access for :ref:`multi-cloud clusters
  <create-cluster-multi-region>`.
- |service| free- (**M0**) and shared-tier (**M2**/**M5**) clusters
  upgraded to MongoDB 4.4.
- Defaults new clusters to MongoDB 4.4.
- Introduces custom archiving rules for |service| :ref:`Online Archive 
  <manage-online-archive>`.
- Introduces the ability to use an |aws| |iam| role to authorize
  |service| to access: 
  - |aws| |kms| encryption keys for customer key management, or
  - |s3| buckets for {+data-lake+}\s.
- Introduces the ability to peer to |service| VPCs on |gcp| with a 
  smaller |cidr| block. When you create the network peering container 
  using the |service| :ref:`API <atlas-create-peering-container-api>`, 
  you can specify a |cidr| block between ``/21`` and ``/24``, inclusive,
  insead of the default, ``/18``. 
- Adds the ability to specify an |aws| |arn| with a compound path when
  you create an |aws| IAM-authenticated :ref:`database user
  <mongodb-users>`. 

.. _atlas_20210106:

06 January 2021 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Changes the cluster-level navigation UI so that |fts| is now a top 
  level tab.
- Introduces a visual editor for :ref:`creating <ref-create-index>` 
  an |fts| index.
- Allows users of the |bic| to download |bic-short| logs.
