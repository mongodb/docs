The index name defaults to :guilabel:`default`. You can leave
the default name in place or choose one of your own.

.. note::

   If you name your index ``default``, you don't need to specify
   an ``index`` parameter when using the :ref:`$search
   <query-syntax-ref>` pipeline stage. Otherwise, you must specify
   the index name using the ``index`` parameter.

Index names must be unique within their namespace.