.. setting:: kubernetes.templates.credentialsFilePath

   *Type*: string

   
   Path to the YAML file that contains your :ref:`Programmatic API Key 
   <mms-prog-api-key>` as a Kubernetes secret to create or update 
   Kubernetes `objects <https://kubernetes.io/docs/concepts/overview/working-with-objects/kubernetes-objects/>`__ 
   in your |mms| project.
   
   This file must be in YAML format and must be stored under 
   ``/mongodb-ops-manager/`` directory. 
   
   .. code-block:: yaml
   
      apiVersion: v1
      kind: Secret
      metadata:
        name: organization-secret
        namespace: mongodb
      stringData:
        user: ${publicKey}
        publicApiKey: ${privateKey}
   
   Corresponds to :setting:`Kubernetes Secret Setup`.
   

