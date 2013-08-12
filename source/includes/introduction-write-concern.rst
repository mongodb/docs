:term:`Write concern` describes the guarantee that MongoDB provides
when reporting on the success of a write operation. When inserts,
updates and deletes have a more *weak* write concern, write operations
return quickly. In some failure cases write operations issued with
weak write concerns may not persist. With *stronger* write concerns,
clients wait after sending a for MongoDB to confirm the write
operations.

MongoDB provides different levels of write concern to better address
the specific needs of applications. Clients may adjust write concern
to ensure that the most important operations persist successfully to
an entire MongoDB deployment, and ensure fast performance for other
less critical operations.
