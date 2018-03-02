.. note::

   Killing a session kills any in-progress operations in the
   session, and closes any open cursors associated with these
   operations.  The killed session may still be listed as a
   current session, and future operations may use the killed
   session.
