.. warning::

   Grant your containers permission to write to your |k8s-pv|.
   The |k8s-op-short| sets ``fsGroup = 2000`` in 
   :k8sdocs:`securityContext </tasks/configure-pod-container/security-context/>`
   This makes |k8s|
   :k8sdocs:`try to fix write permissions </tasks/configure-pod-container/security-context/#discussion>`
   for the |k8s-pv|. If redeploying the resource does not fix
   issues with your |k8s-pvs|, contact MongoDB support.
