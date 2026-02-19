|service| deprecated ``M2`` and ``M5`` {+clusters+} and {+Serverless-instances+}.
As of January 2025, |service| migrated all ``M2`` and ``M5``
{+clusters+} to {+Flex-clusters+}. For {+Serverless-instances+}, |service|
determined whether to migrate instances to {+Free-clusters+},
{+Flex-clusters+}, or {+Dedicated-clusters+} according to usage,
then migrated all {+Serverless-instances+} automatically.


As of January 22, 2026, support for ``M2``, ``M5``, and {+Serverless-instances+}
ended. APIs related to these deprecated cluster types are no longer available,
and only APIs for {+Flex-clusters+} remain in place.

As of March 2025, private endpoints on {+Serverless-instances+} are no longer 
supported. Remove all ``M2``, ``M5``, and {+Serverless-instance+} features 
from your {+ak8so+} configurations.

If your workloads require :atlas:`Private Endpoints </data-federation/admin/manage-private-endpoint/>` or
:atlas:`Continuous Backup
</backup/cloud-backup/dedicated-cluster-backup/#continuous-cloud-backups>`, switch to
|service| {+Dedicated-Clusters+}. To learn more, see :ref:`ak8so-migration-to-flex` and
the :atlas:`Atlas Flex Migration Guide </flex-migration>`.
