Starting in MongoDB 4.4.2 (also available starting in 4.2.12),
changes made to the :ref:`database profiler
<database-profiler>` ``level``, ``slowms``, ``sampleRate``, or
``filter`` using the :dbcommand:`profile` command or
:method:`db.setProfilingLevel()` wrapper method are recorded in the
:option:`log file <mongod --logpath>`.
