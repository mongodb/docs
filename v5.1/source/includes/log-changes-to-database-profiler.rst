Starting in MongoDB 5.0 (also available starting in 4.4.2, 4.2.12, and
4.0.22), changes made to the :ref:`database profiler
<database-profiler>` ``level``, ``slowms``, ``sampleRate``, or
``filter`` using the :dbcommand:`profile` command or
:method:`db.setProfilingLevel()` wrapper method are recorded in the
:option:`log file <mongod --logpath>`.