.. note::

   You must chain a cursor method such as ``sort()``, ``limit()``, 
   ``skip()``, or ``project()`` to a read operation before iterating the cursor. 
   If you specify a cursor method after iterating the cursor, the setting does 
   not apply to the read operation. 