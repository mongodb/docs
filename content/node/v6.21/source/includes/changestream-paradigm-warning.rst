.. warning::

   Using a ``ChangeStream`` in ``EventEmitter`` and ``Iterator`` mode
   concurrently is not supported by the driver and causes an error. This
   is to prevent undefined behavior, where the driver cannot guarantee
   which consumer receives documents first.


