For MongoDB Atlas, it is recommended to
:ref:`configure storage auto-scaling <cluster-autoscaling>` to prevent 
long-running queries from filling up storage with temporary files.

If your Atlas cluster uses storage auto-scaling, the temporary files 
may cause your cluster to scale to the next storage tier.