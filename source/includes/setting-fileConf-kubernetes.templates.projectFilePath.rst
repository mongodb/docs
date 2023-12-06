.. setting:: kubernetes.templates.projectFilePath

   *Type*: string

   
   Path to the YAML file that contains the ConfigMap to use to link to 
   your |mms| project.
   
   This file must be in YAML format and must be stored under 
   ``/mongodb-ops-manager/`` directory. 
   
   
   .. include:: /includes/code-examples/k8s-project-file-path.yaml
   
   Corresponds to :setting:`Kubernetes ConfigMap Setup`.
   

