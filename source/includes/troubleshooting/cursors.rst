'Cursor' Object Has No Attribute '_Cursor__killed'
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

{+driver-short+} v3.8 or earlier raises a ``TypeError`` and an
``AttributeError`` if you supply invalid arguments to the ``Cursor``
constructor. The ``AttributeError`` is irrelevant, but the ``TypeError``
contains debugging information as shown in the following example:

.. code-block::

   Exception ignored in: <function Cursor.__del__ at 0x1048129d8>
   ...
   AttributeError: 'Cursor' object has no attribute '_Cursor__killed'
   ...
   TypeError: __init__() got an unexpected keyword argument '<argument>'

To fix this, ensure that you supply the correct keyword arguments. You can also
upgrade to {+driver-short+} v3.9 or later, which removes the irrelevant error.

"*CursorNotFound* cursor id not valid at server"
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Cursors in MongoDB can timeout on the server if they've been open for
a long time without any operations being performed on them. This can
lead to a ``CursorNotFound`` exception when you try to iterate through the cursor.