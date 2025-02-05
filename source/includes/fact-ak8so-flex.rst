{+Serverless-instances+} will be deprecated soon. |ak8so| supports {+Flex-clusters+}.
Replace references to :setting:`spec.serverlessSpec` with configuration for
:setting:`spec.flexSpec`. 

The automatic migration of ``M2`` and ``M5`` {+clusters+} and {+Serverless-instances+}
to {+Flex-clusters+} is seamless in |ak8so| without you having to make any
migration changes, even though your CRD configurations might still contain parameters
that are EOL. 

To preserve backwards compatibility of the APIs for a period of time, |service|
will continue to allow for these migrated {+clusters+} to be managed
through the same APIs, including when using |ak8so|. The backwards
compatibility of APIs will remain in place until January 2026, when the old
APIs will be removed and only APIs related to {+Flex-clusters+} will remain in place.

Support for private endpoints on {+Serverless-instances+} will end in March 2025. 
You must update your {+ak8so+} configurations to remove private endpoints
by March 2025. You must remove all remaining ``M2``, ``M5``, and 
{+Serverless-instance+} features from your {+ak8so+} configurations before 
January 2026.

To learn more, see :ref:`ak8so-migration-to-flex`
in this guide and the :atlas:`Flex Migration Guide </flex-migration>`
in the |service| documentation.