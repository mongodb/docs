5. Create a |k8s-secret| that contains 
   credentials authorized to pull images from the 
   ``registry.connect.redhat.com`` repository:

   a. If you have not already, obtain a Red Hat subscription.

   #. Create a `Registry Service Account <https://access.redhat.com/terms-based-registry/>`__.

   #. Click on your Registry Service Account, then click the 
      :guilabel:`Docker Configuration` tab.

   #. Download the ``<account-name>-auth.json`` file and open it in a 
      text editor.

   #. Copy the ``registry.redhat.io`` object, and paste another instance
      of this object into the file. Remember to add a comma after the 
      first object. Rename the second object 
      ``registry.connect.redhat.com``, then save the file:

      .. code-block:: json
         :emphasize-lines: 5-9

         {
           "auths": {
            "registry.redhat.io": {
             "auth": "<encoded-string>"
            },
           "auths": {
            "registry.connect.redhat.com": {
             "auth": "<encoded-string>"
            }            
           }
         }

   #. Create a ``openshift-pull-secret.yaml`` file with the contents of 
      the modified ``<account-name>-auth.json`` file as ``stringData`` 
      named ``.dockerconfigjson``:

      .. code-block:: yaml
         :emphasize-lines: 4-16

         apiVersion: v1
         kind: Secret
         metadata:
           name: openshift-pull-secret
         stringData:
           .dockerconfigjson: |
               {
                 "auths": {
                   "registry.redhat.io": {
                     "auth": "<encoded-string>"
                   },
                   "registry.connect.redhat.com": {
                     "auth": "<encoded-string>"
                   }
                 }
               }
         type: kubernetes.io/dockerconfigjson

      The value you provide in the ``metadata.name`` field contains
      the secret name. Provide this value when asked for the 
      ``<openshift-pull-secret>``.

   #. Create a |k8s-secret| from the ``openshift-pull-secret.yaml`` 
      file:

      .. code-block:: sh

         oc apply -f openshift-pull-secret.yaml -n <namespace>