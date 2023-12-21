.. note::

   By default, |ak8so| keeps connection secrets in the same |k8s-ns| 
   as the :ref:`atlasproject-custom-resource`. To store 
   secrets in another |k8s-ns|, specify the 
   :setting:`spec.connectionSecretRef.namespace` parameter.
