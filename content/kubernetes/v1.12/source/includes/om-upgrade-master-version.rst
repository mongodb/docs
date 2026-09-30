a. Set :opsmgrkube:`spec.version` to the new |onprem| version. 

#. If you upgraded your :ref:`application database <appdb-om-arch>`, set 
   :opsmgrkube:`spec.applicationDatabase.version` to the compatible MongoDB 
   version. 

.. include:: /includes/admonitions/ubi-8-min-db-versions.rst

.. warning::

   As shown in the example below, because the {+appdb+} resources associated 
   with your current |onprem| deployment are upgraded in a rolling fashion, you 
   must explicitly set the ``featureCompatibilityVersion`` to the current version 
   of MongoDB that {+appdb+} is running before starting the upgrade process.  
   
   This prevents potential data misalignment issues between |onprem| and 
   {+appdb+} during the upgrade process. 

.. literalinclude:: /reference/k8s/example-ops-manager.yaml
  :language: yaml
  :linenos: