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

