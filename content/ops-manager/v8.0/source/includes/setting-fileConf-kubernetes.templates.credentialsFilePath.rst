.. setting:: kubernetes.templates.credentialsFilePath

   *Type*: string

   Path to the YAML file that contains your :ref:`Programmatic API Key 
   <mms-prog-api-key>` as a |k8s| secret to create or update |k8s-objs|
   in your |mms| project. This file must be in YAML format and must be
   stored under the ``/mongodb-ops-manager/`` directory. This file
   corresponds to :setting:`Kubernetes Secret Setup`.

   .. code-block:: yaml

      apiVersion: v1
      kind: Secret
      metadata:
        name: organization-secret
        namespace: mongodb
      stringData:
        user: ${publicKey}
        publicApiKey: ${privateKey}
