.. note::

   Since MongoDB version 4.4.8, cursors that are part of a session ignore
   the ``noCursorTimeout`` option. MongoDB automatically closes these 
   cursors when the session ends or times out.