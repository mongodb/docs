The following steps depend on how your environment is configured:

.. tabs::
   
   .. tab:: Kubernetes

      .. tabs::
         
         .. tab:: Online using kubectl
            :tabid: kubectlup
 
            .. _upgrade-k8s-operator-kubectl:

            .. include:: /includes/steps/upgrade-kubectl.rst

         .. tab:: Online using Helm
            :tabid: helmonlinek8sup

            .. _upgrade-k8s-operator-helm:

            .. include:: /includes/steps/upgrade-k8s-online-helm.rst
            
         .. tab:: Offline using Helm and Docker
            :tabid: helmofflinek8sup

            To upgrade the |k8s-op-short| on a host not connected to the
            Internet, you have two options, you can download the
            |k8s-op-short| files from either:

            .. note that these tabs contain the same content but I don't
               think that's intended. separated the includes out to 
               prepare for corrections.

            .. tabs::

               .. tab:: The Internet
                  :tabid: internetk8sup

                  .. include:: /includes/steps/upgrade-k8s-offline-helm-internet.rst
                  
               .. tab:: Another Host
                  :tabid: hostk8sup

                  .. include:: /includes/steps/upgrade-k8s-offline-helm-host.rst

   .. tab:: OpenShift
      :tabid: osup

      .. tabs:: 
      
         .. tab:: Online using oc
            :tabid: ocup

            .. _upgrade-k8s-operator-oc:

            .. include:: /includes/steps/upgrade-oc.rst

         .. tab:: Online using Helm
            :tabid: helmonlineosup

            .. _upgrade-operator-helm-oc:

            .. include:: /includes/steps/upgrade-os-online-helm.rst
            
         .. tab:: Offline using Helm and Docker
            :tabid: helmofflineosup

            .. note that these tabs contain the same content but I don't think that's intended. separated the includes out to prepare for corrections.

            To upgrade the |k8s-op-short| on a host not connected to the
            Internet, you have two options, you can download the
            |k8s-op-short| files from either:

            .. tabs::

               .. tab:: The Internet
                  :tabid: internetosup

                  .. include:: /includes/steps/upgrade-os-offline-helm-internet.rst
                  
               .. tab:: Another Host
                  :tabid: hostosup

                  .. include:: /includes/steps/upgrade-os-offline-helm-host.rst

.. include:: /includes/troubleshoot-k8s.rst
