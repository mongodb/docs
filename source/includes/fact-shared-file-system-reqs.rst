If you configure |onprem| to use multiple |onprem| application 
servers behind an |http| or |https| load balancer, |fcv-link| 4.2 or 
later backup snapshot jobs run in parallel on one or more servers. 
Ensure that you have a shared file system mounted on each |onprem| 
server. The |onprem| application server might open and write 
different offsets of the same files. Ensure that the shared file 
system allows this. Otherwise, you will encounter access errors.
