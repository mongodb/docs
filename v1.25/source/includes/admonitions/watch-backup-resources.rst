If a MongoDB database resource with this name doesn't exist, the
``backup`` resource enters a ``Pending`` state. The |k8s-op-short|
retries every 10 seconds until a MongoDB database resource with this
name is created.

.. note:: 

   The |k8s-op-short| begins to reconcile the |onprem| resource 
   automatically when you make security changes to the database 
   resources you reference in this setting. The |k8s-op-short| updates
   the ``mongoURI`` and ``ssl`` flags in the |onprem| configuration 
   based on your changes.