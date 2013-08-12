:term:`Write concern` describes the guarantee that MongoDB provides
when reporting on the success of a write operation. When inserts,
updates and deletes have a *lower* or *weaker* write concern, write
operations return quickly. In some failure scenarios write operations
issued with weak write concerns may not persist. With *higher* or
*stronger* levels of write concern, clients wait after sending a for
MongoDB to confirm the success or failure of the write operation.

MongoDB provides different levels of write concern that provide
different kinds of guarantees about the success and failure of the
write operation. Applications can adjust write concern based on the
kind of operation to ensure that the most important operations persist
successfully to an entire MongoDB deployment, and ensure fast
performance for other less critical operations.
