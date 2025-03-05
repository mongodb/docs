.. _atlas_2025_02_05:

5 February 2025 Release
~~~~~~~~~~~~~~~~~~~~~~~~

- Adds :ref:`disk throughput <alert-conditions-disk-throughput>` and
  :ref:`push-based log export <alert-conditions-push-based-log-export>`
  alert conditions.

- Improves :ref:`cluster auto-scaling <cluster-autoscaling>` and elasticity
  for ``M10`` and ``M20`` {+clusters+}, responding to resource demands
  up to five times faster. Optimizes workload performance and availability,
  potentially lowering costs.

- Allows you to set protected hours for your project, during which |service|
  avoids performing standard updates to the clusters. To learn more,
  see :ref:`maintenance-window-protected-hours`.

- Introduces :ref:`Atlas resource policies <atlas-resource-policies-overview>`
  in public preview. |service| resource policies define configuration standards
  for MongoDB {+clusters+} across your organization, with options to limit
  cloud providers, regions, and wildcard IPs.

.. _atlas_2025_01_08:

8 January 2025 Release
~~~~~~~~~~~~~~~~~~~~~~~~

- Adds the :authrole:`Project Database Access Admin`, :authrole:`Project Backup Manager`,
  and :authrole:`Project Observability Viewer` roles that allow for more
  granular access within |service| projects.

