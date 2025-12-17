- Until January 2026, to preserve backwards compatibility for a period of time,
  |service| allows you to manage migrated {+clusters+} through both
  the {+Serverless-instances+} and {+Flex-clusters+} APIs, including when
  you're using |ak8so|.

- You can create and manage {+Flex-clusters+} in the same
  :ref:`AtlasDeployment <atlasdeployment-custom-resource>` in which you
  created and managed {+Serverless-instances+} and ``M2`` and ``M5`` {+clusters+}.

- You can't create **NEW** ``M2``/``M5`` {+clusters+} and {+Serverless-instances+}
  in |service|. Attempting to do so creates a {+Flex-cluster+} instead.

- You can still use existing {+Serverless-instances+} in |ak8so| even though
  existing {+Serverless-instances+} are deprecated as of early February 2025.

- For your existing {+Serverless-instances+}, you can choose to replace
  references to :ref:`spec.serverlessSpec <atlasdeployment-spec-serverlessspec>` in the :ref:`AtlasDeployment <atlasdeployment-custom-resource>`
  with the configuration for :ref:`spec.flexSpec <atlasdeployment-spec-flexspec>`. Or, you can
  continue using the same spec. Managing a deployment via the ``spec.serverlessSpec``
  in the ``AtlasDeployment`` Custom Resource will continue to work even
  once |service| automatically migrates these existing {+clusters+} to
  {+Flex-clusters+} in March 2025.

- For your existing ``M2`` and ``M5`` {+clusters+}, you can choose to replace
  references to :ref:`spec.deploymentSpec <atlasdeployment-spec-deploymentspec>` in the ``AtlasDeployment``
  Custom Resource with the configuration for :ref:`spec.flexSpec <atlasdeployment-spec-flexspec>`. Or, you can
  continue using the same spec. Managing a deployment via the ``spec.deploymentSpec``
  in the ``AtlasDeployment`` Custom Resource will continue to work even
  once |service| automatically migrates these existing ``M2`` and ``M5`` {+clusters+}
  to {+Flex-clusters+} in May 2025.

- For your existing {+Serverless-instances+}, if you receive errors during
  reconciliations related to private endpoints, you must upgrade to
  {+ak8so+} 2.7.1, or replace the ``serverlessSpec`` configuration with
  the configuration for ``flexSpec`` in the ``AtlasDeployment`` custom resource.

- For your ``M2`` and ``M5`` {+clusters+}, to avoid reconciliation errors
  that you might notice after the automigration, make the following changes
  to your CRD configurations:

  - Remove the :ref:`spec.deploymentSpec.replicationSpecs.zoneName <atlasdeployment-spec-deploymentspec-replicationspecs>` setting.

  - Remove any of the :ref:`spec.deploymentSpec.replicationSpecs.regionConfigs <atlasdeployment-spec-deploymentspec-replicationspecs-regionconfigs>`
    settings after the first set of settings.

  - Specify ``replicaset`` only in the :ref:`spec.deploymentSpec.clusterType <atlasdeployment-spec-deploymentspec>`.

  Alternatively, replace references to ``spec.deploymentSpec``
  in the :ref:`AtlasDeployment <atlasdeployment-custom-resource>` with the configuration for
  ``spec.flexSpec``.

- By January 2026, you must remove all remaining ``M2``/``M5`` and 
  {+Serverless-Instance+} configurations from your {+ak8so+} custom resources
  because backwards compatibility of APIs ends January 2026, when the old
  APIs will be removed and only APIs related to {+Flex-clusters+} will
  remain in place.

- Newer releases of {+ak8so+} will cease supporting existing
  ``M2``/``M5`` {+clusters+} and {+Serverless-instances+}. Older versions of {+ak8so+}
  will continue to support these instance types until January 2026.

To learn more, see :ref:`ak8so-migration-to-flex`
in this guide and the :atlas:`Flex Migration Guide </flex-migration>`
in the |service| documentation.