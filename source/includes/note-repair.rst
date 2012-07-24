.. note::

   When using :term:`journaling <journal>`, there is almost never
   any need to run :dbcommand:`repairDatabase`. In the event of an
   unclean shutdown, the server will be able restore the data files
   to a pristine state automatically.
