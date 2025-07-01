.. setting:: Read Cache Size (MB)

   *Default*: 512

   
   Size (in megabytes) that you allocate from the |jvm| heap for the
   global snapshot cache. The global snapshot cache optimizes
   repeated queries for the same snapshot data to the Queryable
   Snapshots.
   
   .. important::
   
      MongoDB does not advise changing this value unless MongoDB support
      directs you to change it.
   
   Corresponds to :setting:`brs.queryable.lruCacheCapacityMB`.
   

