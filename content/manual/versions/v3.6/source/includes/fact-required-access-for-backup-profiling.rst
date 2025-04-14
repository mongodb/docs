.. versionchanged:: 3.2.1

   The :authrole:`backup` role provides additional privileges to back
   up the :data:`system.profile <<database>.system.profile>`
   collections that exist when running with :ref:`database profiling
   <database-profiling>`. Previously, users required an additional
   ``read`` access on this collection.
