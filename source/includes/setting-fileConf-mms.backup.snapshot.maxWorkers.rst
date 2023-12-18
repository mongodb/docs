.. setting:: mms.backup.snapshot.maxWorkers

   *Type*: integer

   *Default*: 4

   
   This sets the number of files that are saved concurrently when
   taking a :manual:`snapshot </reference/glossary/#std-term-snapshot>`. Increasing the value of this setting can
   improve :term:`backup job` performance when there are a large number
   of small files in a high latency environment.
   
   

