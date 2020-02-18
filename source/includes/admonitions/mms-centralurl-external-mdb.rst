.. important::

   If |onprem| will manage MongoDB resources deployed outside of the 
   |k8s| cluster it's deployed to, you must add the ``mms.centralUrl`` 
   setting to ``spec.configuration``.

   Set the value to the URL by which |onprem| is exposed outside of the 
   |k8s| cluster.

   .. seealso:: :ref:`mdb-resource-deployment-locations`
