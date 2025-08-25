Manually compacting a realm can be a resource-intensive operation. 
Your application should not compact every time you open 
a realm. Instead, try to optimize compacting so your application does 
it just often enough to prevent the file size from growing too large. 
If your application runs in a resource-constrained environment,
you may want to compact when you reach a certain file size or when the 
file size negatively impacts performance.

These recommendations can help you start optimizing compaction for your 
application:

- Set the max file size to a multiple of your average realm state
  size. If your average realm state size is 10MB, you might set the max 
  file size to 20MB or 40MB, depending on expected usage and device
  constraints.
- As a starting point, compact realms when more than 50% of the realm file 
  size is no longer in use. Divide the currently used bytes by the total 
  file size to determine the percentage of space that is currently used. 
  Then, check for that to be less than 50%. This means that greater than 
  50% of your realm file size is unused space, and it is a good time to 
  compact. After experimentation, you may find a different percentage 
  works best for your application.