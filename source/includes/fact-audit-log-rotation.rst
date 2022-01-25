.. important::
     
   If you're running MongoDB Enterprise version 5.0 or later and 
   {+mdbagent+} {+mdbagent-version-opsmgr+} or later, you can:

   - Set separate rules for rotating server logs and audit logs.
   - Compress and delete audit logs using |mms|. For security reasons, we recommend managing
     your audit log compression and deletion outside of |mms|.
   
   If you're running earlier versions of MongoDB Enterprise or the
   {+mdbagent+}, |mms|: 

   - Uses your :guilabel:`System Log Rotation` settings to rotate both the
     server logs and the audit logs. 
   - Doesn't compress or delete audit logs. If you configure compression and
     deletion, |mms| applies these settings to the server logs only.

   MongoDB Community users can rotate, compress, and delete the server logs
   only.


