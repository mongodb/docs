Starting in MongoDB 5.1, you must set the
:ref:`Cluster Wide Write Concern (CWWC) <set_global_default_write_concern>` 
prior to issuing any :method:`reconfigs <rs.reconfig()>` 
that would otherwise change the 
:ref:`default write concern <write-concern>` of the new 
:term:`replica set` member.