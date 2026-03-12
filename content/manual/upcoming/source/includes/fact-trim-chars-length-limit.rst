Starting in MongoDB 8.3, the length of the string you provide to ``chars`` is 
limited to 4096 characters. If you provide a string longer than 4096 characters,
MongoDB returns an error similar to the following:

.. code-block:: none

   $trim/$ltrim/$rtrim requires 'chars' to be not greater than 4096 bytes, got 
   <length> bytes instead.