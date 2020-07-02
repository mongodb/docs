.. admonition:: OpenShift 3.11 or earlier
   :class: note

   If you run OpenShift 3.11 or earlier, you must first manually edit the |k8s-crds| to remove subresources. In each |k8s-crd|, remove the
   following option:

   .. literalinclude:: /includes/install/upgrade-crds-oc-helm.yaml
       :language: yaml
       :emphasize-lines: 2-3
