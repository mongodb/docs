.. note::

   You cannot combine the :operator:`$near` operator, which requires a
   special :ref:`geospatial index <index-feature-geospatial>`, with a
   query operator or command that uses a different type of special
   index. For example you cannot combine :operator:`$near` with the
   :dbcommand:`text` command.

.. TODO this will be fixed in 2.6 and can be removed.
