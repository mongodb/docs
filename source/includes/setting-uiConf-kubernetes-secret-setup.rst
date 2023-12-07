.. setting:: Kubernetes Secret Setup

   *Type*: string

   
   Path to the YAML file that contains your :ref:`Programmatic API Key 
   <mms-prog-api-key>` as a Kubernetes secret to create or update 
   Kubernetes `objects <https://kubernetes.io/docs/concepts/overview/working-with-objects/kubernetes-objects/>`__ 
   in your |mms| project.
   
   This file must be in YAML format and must be stored under 
   ``/mongodb-ops-manager/`` directory. 
   
   
   Corresponds to :setting:`kubernetes.templates.credentialsFilePath`.
   

