Starting in MongoDB 4.0.22, changes made to the :ref:`database profiler
<database-profiler>` profile level, ``slowms``, or ``sampleRate``
using the :dbcommand:`profile` command or
:method:`db.setProfilingLevel()` wrapper method are recorded in the
:option:`log file <mongod --logpath>`.