To install the MongoDB |k8s-op-short|, you must:

1. Have a |k8s| solution available to use.

   If you need a |k8s| solution, see the |k8s|
   :k8sdocs:`documentation on picking the right solution </setup>`.

#. Clone the :gh:`MongoDB Enterprise Kubernetes Operator repository </mongodb/mongodb-enterprise-kubernetes>`.

   .. code-block:: sh

      git clone https://github.com/mongodb/mongodb-enterprise-kubernetes.git

   .. note::

      You can use `Helm <https://helm.sh/>`__ to install the
      |k8s-op-short|. To learn how to install Helm, see its
      :gh:`documentation on GitHub </kubernetes/helm>`.

#. Create a |k8s-ns| for your |k8s| deployment. By default, The
   |k8s-op-short| uses the ``mongodb`` namespace. To simplify your
   installation, consider creating a namespace labeled ``mongodb``
   using the following |kubectl| command:

   .. code-block:: sh

      kubectl create namespace mongodb

   If you do not want to use the ``mongodb`` namespace, you can label
   your namespace anything you like:

   .. code-block:: sh

      kubectl create namespace <namespaceName>

#. (Optional) Have a running |onprem-link|.

   If you don't deploy an |onprem| resource with the
   |k8s-op-short|, you must have an |onprem| running outside of your
   |k8s| cluster. If you will deploy an |onprem| resource in |k8s| with the |k8s-op-short|, skip this prerequisite.

   .. important::

      Your |onprem| installation must run an active |ntp| service. If
      the |onprem| host's clock falls out of sync, that host can't
      communicate with the |k8s-op-short|. 

      To learn how to check your |ntp| service for your Ops Manager
      host, see the documentation for
      `Ubuntu <https://help.ubuntu.com/lts/serverguide/NTP.html>`__ or
      `RHEL
      <https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/system_administrators_guide/s1-checking_the_status_of_ntp>`__.

#. (**Required for OpenShift Installs**) Create a |k8s-secret| that 
   contains credentials authorized to pull images from the 
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
