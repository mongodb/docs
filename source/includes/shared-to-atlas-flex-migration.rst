.. important::

    As of February 2025, you can create {+Flex-clusters+}, and can no longer
    create ``M2`` and ``M5`` {+clusters+} or {+Serverless-instances+} in the 
    {+atlas-ui+}, {+atlas-cli+}, {+atlas-admin-api+}, |ak8so|, HashiCorp Terraform,
    or |service| CloudFormation Resources.
    You can still use existing {+Serverless-instances+}.

    |service| no longer supports ``M2`` and ``M5`` {+clusters+}.
    |service| deprecated {+Serverless-instances+}. As of May 25, 2025,
    |service| has automatically migrated all existing ``M2`` and ``M5``
    {+clusters+} to {+Flex-clusters+}.
    
    For {+Serverless-instances+}, beginning May 5 2025, |service| will
    determine whether to migrate instances to {+Free-clusters+},
    {+Flex-clusters+}, or {+Dedicated-clusters+} according to your usage. 
    To see which tiers |service| will migrate your instances
    to, consult the `All Clusters <https://cloud.mongodb.com/v2#/clusters>`__ 
    page in the {+atlas-ui+}.
