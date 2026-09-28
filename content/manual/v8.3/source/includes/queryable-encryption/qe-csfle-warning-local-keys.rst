.. warning:: Do Not Use a Local Key File in Production

   A local key file in your filesystem is insecure and is
   **not recommended** for production. Instead,
   you should store your {+cmk-long+}s in a remote
   :wikipedia:`{+kms-long+} <Key_management#Key_management_system>`
   ({+kms-abbr+}).

   To learn how to use a remote {+kms-abbr+} in your
   {+in-use-encryption+} enabled application,
   see the :ref:`{+qe+} Automatic Encryption Tutorial
   <qe-tutorial-automatic-encryption>` or :ref:`{+csfle-abbrev+}
   Automatic Encryption Tutorial <csfle-tutorial-automatic-encryption>`.