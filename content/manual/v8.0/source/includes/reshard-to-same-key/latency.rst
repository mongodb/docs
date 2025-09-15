You must ensure that your application can tolerate two seconds where 
the collection being resharded blocks writes. When writes are blocked, 
your application experiences an increase in latency. If your workload 
cannot tolerate this requirement, use chunk migrations to balance your 
cluster.
