The :parameter:`maxIndexBuildMemoryUsageMegabytes` limit applies to all
index builds initiated by user commands like :dbcommand:`createIndexes` or
administrative processes like :ref:`initial sync <replica-set-sync>`.

An :ref:`initial sync <replica-set-sync>` populates only one collection 
at a time and has no risk of exceeding the memory limit. However, it is 
possible for a user to start index builds on multiple collections in 
multiple databases simultaneously.
