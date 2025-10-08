.. note:: 32-bit Environments

   We recommend that you use the PHP driver on a 64-bit environment. On 32-bit environments,
   the driver returns 64-bit integers from the database as instances of the
   `MongoDB\\BSON\\Int64 <https://www.php.net/manual/en/class.mongodb-bson-int64.php>`__
   class, not PHP integers.