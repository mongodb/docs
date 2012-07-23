.. note::

	The database cannot be locked with :func:`db.fsyncLock()` while profiling is enabled.
	You must disable profiling before locking the database with :func:`db.fsyncLock()`.
	Disable profiling using :func:`db.setProfilingLevel(0)`;
