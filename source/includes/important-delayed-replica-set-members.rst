.. important::

   If your replica set contains :doc:`delayed members
   </core/replica-set-delayed-member>` ensure that the delayed
   members are hidden and non-voting. 

   Hiding delayed replica set members prevents applications from seeing 
   and querying delayed data without a direct connection to that member.
   Making delayed replica set members non-voting means they will not 
   count towards acknowledging write operations with read concern 
   :readconcern:`"majority"`.

   If you do not hide delayed members and one or more nodes 
   becomes unavailable, the replica set has to wait for the delayed 
   member and the commit point lags. A lagged commit point can lead to
   performance issues.

   For example:

   - Primary-Secondary-Delayed replica set config where delayed 
     secondary is voting with 10 mins delay.
   - With one non-delayed secondary unavailable, the degraded config of
     Primary-Delayed will have to wait at least 10 minutes for a write 
     concern with majority to be acknowledged.
   - The majority commit point will take longer to advance leading to 
     cache pressure similar to performance issues with a PSA replica 
     set.