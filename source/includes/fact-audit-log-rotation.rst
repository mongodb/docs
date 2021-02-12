.. important::

   If you enable log rotation, |mms| uses the default MongoDB
   :manual:`log rotation </tutorial/rotate-log-files/>`, which rotates
   both the server logs and audit logs. However, |mms| does not:

   - Support separate rules for rotating server logs and audit logs;
     |mms| treats them both the same way.

   - Perform any compression or deletion of audit logs for security
     reasons. You must use an appropriate security software to compress
     and delete audit logs.
