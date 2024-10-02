Compaction regularly checkpoints the database, which can lead to 
synchronization overhead. On high-traffic databases, this can potentially 
delay or prevent operational tasks such as taking backups. To avoid unexpected 
disruptions, disable compaction before taking a backup. 
