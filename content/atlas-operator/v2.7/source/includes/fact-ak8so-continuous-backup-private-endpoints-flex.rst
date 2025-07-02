|service| deprecated ``M2`` and ``M5`` {+clusters+} and {+Serverless-instances+}.
In the near future, |service| will automatically migrate all ``M2`` and ``M5``
{+clusters+} to {+Flex-clusters+}. For {+Serverless-instances+}, |service| will
determine whether to migrate instances to {+Free-clusters+},
{+Flex-clusters+}, or {+Dedicated-clusters+} according to your usage,
then migrate your {+Serverless-instances+} automatically.


To preserve backwards compatibility of the APIs for a period of time, |service|
will continue to allow for these migrated {+clusters+} to be managed
through the same APIs (old and new APIs), including when using |ak8so|. The backwards
compatibility of APIs will remain in place until January 2026, when the old
APIs will be removed and only APIs related to {+Flex-clusters+} will remain in place.

Support for private endpoints on {+Serverless-instances+} will end in March 2025. 
You must update your {+ak8so+} configurations to remove private endpoints
by March 2025. You must remove all remaining ``M2``, ``M5``, and 
{+Serverless-instance+} features from your {+ak8so+} configurations before 
January 2026.

If your workloads require :atlas:`Private Endpoints
</private-endpoint-overview>` or :atlas:`Continuous Backup and Point-in-Time Restore </pit-restore>`,
switch to |service| {+Dedicated-Clusters+}. To learn more, see :ref:`ak8so-migration-to-flex`
and the :atlas:`Atlas Flex Migration Guide </flex-migration>`.