
If the destination is a sharded cluster with the balancer enabled, write 
performance of the destination cluster may degrade during ``mongosync``'s 
Collection Copy phase. To warn of this potential performance impact,   
``mongosync`` runs the :method:`sh.getBalancerState()` command during 
initialization. If ``getBalancerState()`` returns ``true``, ``mongosync`` 
logs a warning. 

If write performance during migration is impacted, consider disabling the 
balancer on the destination cluster. You stop the balancer with the 
:dbcommand:`balancerStop` command, and restart it with the 
:dbcommand:`balancerStart` command.