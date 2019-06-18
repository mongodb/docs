.. _atlas-v20190611:

18 June 2019 Release
~~~~~~~~~~~~~~~~~~~~

- Supports MongoDB 4.2.

- Supports :xml:`<mono><ref target="fts-top-ref">$searchBeta</ref></mono>`.

  - Includes Memory, CPU, and Disk Usage :ref:`monitoring <monitor-cluster-metrics>`.
    For more information, see :ref:`Performance Considerations <perf-ref>`.

  - Includes alerts for Memory.

  - Requires MongoDB 4.2.

- Introduces :doc:`{+data-lake+} </data-lake>` on-demand query service.

- Supports :doc:`Cloud Provider Snapshots <backup/cloud-provider-snapshots/>`
  for 4.2 replica sets.

- Supports Encryption at Rest for snapshots.

- Added :ref:`Aggregation Pipeline Builder <cloud-agg-pipeline>` to the
  :doc:`Data Explorer </data-explorer>`.

.. _atlas-v20190528:

29 May 2019 Release
~~~~~~~~~~~~~~~~~~~

- Support for |gcp| Osaka region.
- Support to search for organization or project names
  that are one character long.

.. _atlas-v20190507:

07 May 2019 Release
~~~~~~~~~~~~~~~~~~~

- :doc:`Cloud Provider Snapshots </backup/cloud-provider-snapshots/>` are now
  available for |gcp|-backed clusters.
- |service| clusters can now use :doc:`Google Cloud KMS for encryption at rest
  <security-gcp-kms>`.
- |service| clusters now have a new MongoDB configuration option that allows
  agents to continue connecting even if you have exceeded the maximum
  number of connections. For example, this means that |service| continues
  to gather monitoring data after reaching the maximum number of connections.
  This change affects all new |service| clusters.  Existing |service| clusters
  are affected the next time you request a configuration change to a cluster.
- |service| projects may now use either the :doc:`Continuous Backup
  </backup/continuous-backups>` or the :doc:`Cloud Provider Snapshots
  <backup/cloud-provider-snapshots/>` backup method. You must delete all existing snapshots before switching between backup methods for an |service| project.
- Enhanced left-hand navigation.

.. _atlas-v20190416:

16 April 2019 Release
~~~~~~~~~~~~~~~~~~~~~

- Supports Microsoft Azure VNet :doc:`peering </security-vpc-peering>`.
- Can load :doc:`sample data </sample-data/load-sample-data>` into an
  |service| cluster.
- Supports the :ref:`Microsoft Azure <microsoft-azure>` South Africa
  North region.
- Supports the :ref:`Google Cloud Platform <google-gcp>` Zurich region.
- Offers self-serve customers option to sign up for a :doc:`support package
  </support>`.

.. _atlas-v20190326:

26 March 2019 Release
~~~~~~~~~~~~~~~~~~~~~

- |service| instances can re-use public IP addresses when replaced in
  the same region.
- Can configure backup schedule and retention for Snapshots Backup.
- |aws| EC2 Capacity for all instance sizes in all regions and
  availability zones is visible via the |service| Admin UI.

.. _atlas-v20190305:

05 March 2019 Release
~~~~~~~~~~~~~~~~~~~~~

- UX improvements to the cluster :guilabel:`Connect` modal.
- Most server replacements get initial data from a disk snapshot of the
  primary instead of an initial sync.
- Support for new shared tier regions:

  - AWS

    - ``eu-central-1`` (``M2/M5``)
    - ``eu-west-1`` (``M0``)
    - ``us-west-2`` (``M0``)

  - Azure 

    - ``northeurope`` (``M0``) 
    - ``westus`` (``M0/M2/M5``)

- Cloud Provider Snapshots for Geo-sharded clusters.

.. _atlas-v20190212:

13 February 2019 Release
~~~~~~~~~~~~~~~~~~~~~~~~

- Supports Google Cloud Peering.
- Introduces Analytics Nodes. These are similar to read-only nodes but
  this special node type makes use of replica set tags to let you
  target workloads to specific secondaries.
- Support for |aws| Stockholm region. With this
  region comes a new largest cluster instance size, ``M700``.
- |service| on :ref:`Azure <microsoft-azure>` 2.0.

  -  ``M10``, ``M80``, and ``M200`` instances are now supported in all
     regions. The ``M90`` instance size is going to be removed shortly.
  - Pricing reductions in most regions.
  - All :ref:`Azure <microsoft-azure>` instances have been migrated to
    latest generation hardware.

.. _atlas-v20190122:

23 January 2019 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Optimizes safe cluster upgrades after failure (no user-facing
  components, internal |service| planner optimizations).
- Allows creation of API Keys that are scoped to an organization and are
  not tied to a human.
- Credit cards will be authorized for a small amount ($1.00) to reduce
  the risk of failed charges.
- Users can now remove themselves from a project.

.. _atlas-v20190101:

01 January 2019 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Optimizes automated rollout to ensure that rollouts happen within
  1 U.S. East business day for non-maintenance-window projects.
- Provides more visibility to maintenance timing in the administration
  user interface.
- Supports On-Demand
  :doc:`Cloud Provider Snapshots </backup/cloud-provider-snapshots>`.

