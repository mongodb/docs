If you are running with :term:`journaling <journal>` enabled, there is
almost never any need to run :dbcommand:`repairDatabase` unless you
need to recover from a disk-level data corruption. In the event of an
unclean shutdown, the server will be able to restore the data files to
a clean state automatically.
