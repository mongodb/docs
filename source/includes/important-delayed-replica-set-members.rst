.. important::

   If your replica set contains :doc:`delayed members
   </core/replica-set-delayed-member>` ensure that the delayed
   members are hidden and non-voting. 

   Hiding delayed replica set members prevents applications from seeing 
   and querying delayed data without a direct connection to that member.
   Making delayed replica set members non-voting means they will not 
   count towards acknowledging write operations with write concern 
   :writeconcern:`"majority"`.

   If you do not hide delayed members and one or more nodes 
   become unavailable, the replica set has to wait for the delayed 
   member and the commit point lags. A lagged commit point can lead to
   performance issues.

   For example, consider a Primary-Secondary-Delayed replica set
   configuration where the delayed secondary is voting with a 10
   minute delay.

   With one non-delayed secondary unavailable, the degraded configuration
   of Primary-Delayed must wait at least 10 minutes to acknowledge a write
   operation with :writeconcern:`"majority"`.The majority commit point 
   will take longer to advance, leading to cache pressure similar 
   performance issues with a
   :ref:`Primary with a Secondary and an Arbiter<rs-architecture-psa>`
   (PSA) replica set.

   For more information on the majority commit point, see 
   :doc:`Causal Consistency and Read and Write Concerns
   </core/causal-consistency-read-write-concerns>`.
