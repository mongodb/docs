.. warning:: Secure your Local Key File in Production

   We recommend storing your {+cmk-long+}s in a remote :wikipedia:`{+kms-long+}
   <Key_management#Key_management_system>` ({+kms-abbr+}). To learn how to use
   a remote {+kms-abbr+} in your {+qe+} implementation, see the 
   :ref:`<qe-tutorial-automatic-encryption>` guide.
   
   If you choose to use a local key provider in production, exercise great
   caution and do not store it on the file system. Consider injecting the key
   into your client application using a sidecar process, or use another 
   approach that keeps the key secure. 