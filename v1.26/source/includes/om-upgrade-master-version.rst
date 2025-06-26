a. Set :opsmgrkube:`spec.version` to the new |onprem| version. 

#. If you upgraded your :ref:`application database <appdb-om-arch>`, set 
   :opsmgrkube:`spec.applicationDatabase.version` to the compatible MongoDB 
   version. 

c. *(Optional)* If you might need to downgrade, set 
   :setting:`spec.featureCompatibilityVersion`.


.. literalinclude:: /reference/k8s/example-ops-manager.yaml
  :language: yaml
  :linenos: