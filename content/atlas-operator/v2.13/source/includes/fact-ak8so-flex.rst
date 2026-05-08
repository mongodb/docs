To manage {+Flex-clusters+}, you must use {+ak8so+} 2.12.0 or later. 
This is the first version free of serverless dependencies.

- You can create and manage {+Flex-clusters+} using the
  :ref:`AtlasDeployment <atlasdeployment-custom-resource>` Custom Resource.

- Use :ref:`spec.flexSpec <atlasdeployment-spec-flexspec>` in the 
  :ref:`AtlasDeployment <atlasdeployment-custom-resource>` Custom Resource
  to configure {+Flex-clusters+}.

- ``M2``/``M5`` {+clusters+} and {+Serverless-instances+} are no longer 
  supported. All existing instances have been migrated to {+Flex-clusters+} 
  or other cluster types.

To learn more, see :ref:`ak8so-migration-to-flex`
in this guide and the :atlas:`Flex Migration Guide </flex-migration>`
in the |service| documentation.
