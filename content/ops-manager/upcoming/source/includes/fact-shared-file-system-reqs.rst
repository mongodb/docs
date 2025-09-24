If you configure |onprem| to use multiple |onprem| application 
servers behind an |http| or |https| load balancer and use 
:manual:`file system snapshots </tutorial/backup-with-filesystem-snapshots>`, 
|fcv-link| 6.0 or 
later backup snapshot jobs run in parallel on one or more servers. 
Ensure that you have a shared file system mounted on each |onprem| 
server. The |onprem| application server might open and write 
different offsets of the same files. Ensure that the shared file 
system allows this. Otherwise, you will encounter access errors.
