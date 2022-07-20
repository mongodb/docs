.. warning::

   Grant your containers permission to write to your |k8s-pv|.
   The |k8s-op-short| sets ``fsGroup = 2000``, ``runAsUser = 2000``, 
   and ``runAsNonRoot = true`` in ``securityContext``. |k8s-op-short| 
   sets ``fsgroup`` equal to ``runAsUser`` to make the volume writable 
   for a user that runs the main process in the container. To learn 
   more, see :k8sdocs:`Configure a 
   Security Context for a Pod or Container
   </tasks/configure-pod-container/security-context/>` and the related 
   :k8sdocs:`discussion 
   </tasks/configure-pod-container/security-context/#discussion>` in 
   the |k8s| documentation. If redeploying the resource doesn't fix
   issues with your Persistent Volume, contact `MongoDB Support
   <https://support.mongodb.com/welcome>`__.
