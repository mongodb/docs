.. note:: 

   You must select copy regions from within the same cloud provider as
   the primary region of your cluster. For example, if your cluster's
   :term:`highest priority region` is set to the |aws| region
   ``us-east-1``, you can only distribute snapshot copies to other |aws|
   regions supported by |service|. 
   
   If you have a global cluster, each zone has its own primary
   region. You must select copy regions within the same cloud
   provider as the primary region for each zone.