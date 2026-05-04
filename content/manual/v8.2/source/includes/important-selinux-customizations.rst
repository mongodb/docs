.. important::

   In addition to the above, if SELinux is in ``enforcing`` mode you
   will also need to further customize your SELinux policy for each of
   these situations:

   - You are using a **custom directory path** instead of using the
     default path for any combination of:
     
     - :setting:`~storage.dbPath`
     - :setting:`systemLog.path`
     - :setting:`~processManagement.pidFilePath`

   - You are using a **custom port** instead of using the :doc:`default
     MongoDB port </reference/default-mongodb-port>`.
   - If you have made other modifications to your MongoDB installation. 

