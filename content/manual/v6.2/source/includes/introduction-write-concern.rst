:ref:`Write Concern <write-concern>` describes the level of
acknowledgement requested from MongoDB for write operations. The level
of the write concerns affects how quickly the write operation returns.
When write operations have a *weak* write concern, they return quickly.
With *stronger* write concerns, clients must wait after sending a write
operation until MongoDB confirms the write operation at the requested
write concern level. With insufficient write concerns, write operations
may appear to a client to have succeeded, but may not persist in some
cases of server failure.
