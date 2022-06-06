If your aggregation pipeline only contains the :ref:`$currentOp 
<determine-query-status>` stage, {+adf+} doesn't enforce the limit on 
the maximum number of simultaneous queries. You can run queries that 
only contain the :ref:`$currentOp <determine-query-status>` stage even 
after you reach the maximum number of simultaneous queries.
