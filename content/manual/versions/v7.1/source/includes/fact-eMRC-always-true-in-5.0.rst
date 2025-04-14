Starting in MongoDB 5.0,
:setting:`~replication.enableMajorityReadConcern` and 
:option:`--enableMajorityReadConcern` cannot be changed 
and are always set to ``true`` due to storage engine improvements. 

In earlier versions of MongoDB, 
:setting:`~replication.enableMajorityReadConcern` and 
:option:`--enableMajorityReadConcern` are configurable and can be set 
to ``false`` to prevent storage cache pressure from immobilizing a 
deployment with a three-member primary-secondary-arbiter (PSA) 
architecture.