.. admonition:: Value must match namespace and name of ConfigMap
  :class: note

  This value *must* match the namespace in which you created the 
  |onprem| :ref:`project ConfigMap <create-k8s-project>`.

  If this |k8s-mdbrsc| is in a different |k8s-ns| than the
  :ref:`project ConfigMap <create-k8s-project>`, you should
  set this value to the namespace *and* name of the
  ConfigMap in this format:
  ``<metadata.namespace>/<metadata.name>``
