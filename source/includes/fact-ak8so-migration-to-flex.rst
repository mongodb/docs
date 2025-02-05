|service| will deprecate ``M2`` and ``M5`` {+clusters+} and
{+Serverless-instances+} in the near future. |service| will
automatically migrate all ``M2`` and ``M5`` {+clusters+}
to {+Flex-clusters+}. 
For {+Serverless-instances+}, |service| will
determine whether to migrate instances to {+Free-clusters+},
{+Flex-clusters+}, or {+Dedicated-clusters+} according to your usage,
then migrate your {+Serverless-instances+} automatically.
To see which tiers |service| will migrate your instances to, consult
the `All Clusters <https://cloud.mongodb.com/v2#/clusters>`__ 
page in the |service| UI. To learn more,
see the :atlas:`Flex Migration Guide </flex-migration>`
in the |service| documentation.