.. list-table::
   :widths: 20 80

   * - :guilabel:`Pull Via Secure HTTP`

     - 

       a. Type a direct download link. 
       
       b. Select from the following options:

          :guilabel:`Pull Restore Usage Limit`
         
          Select whether the link can be re-used or used just once.
          If you select ``No Limit``, the link is re-usable until it
          expires.

          :guilabel:`Restore Link Expiration (in hours)`
            Select the number of hours until the link expires.

       .. important::
          You can skip the remainder of this procedure.

   * - :guilabel:`Push Via Secure Copy`

     - Direct |mms| to copy the restore files to your server via 
       ``SCP``. 

       .. include:: /includes/note-scp-key-pair-requirement.rst

       .. include:: /includes/note-windows-scp-issue.rst

   * - :guilabel:`Format`

     - Select the format in which you want to receive the restore 
       files:

       :guilabel:`Individual DB Files`
         Transmits MongoDB data files produced by |mms| directly to the
         target directory. 

       :guilabel:`Archive`
         Delivers database files in a single archive (``tar`` or
         ``tar.gz``) that you must extract before restoring the
         databases to a working directory. 

         This option displays only if the archive size can be
         calculated.

         With :guilabel:`Archive` delivery, you need
         sufficient space on the destination server for both the 
         archive *and* the extracted files.

   * - :guilabel:`SCP Host`

     - Type the hostname of the server to receive the files.

   * - :guilabel:`SCP Port`

     - Type the port of the server to receive the files.

   * - :guilabel:`SCP User`

     - Type the username used to access to the server.

   * - :guilabel:`Auth Method`

     - Select whether to use a username and password or an SSH
       certificate to authenticate to the server.

   * - :guilabel:`Password`

     - Type the user password used to access to the server.

   * - :guilabel:`Passphrase`

     - Type the SSH passphrase used to access to the server.

   * - :guilabel:`Target Directory`

     - Type the absolute path to the directory on the server to which 
       to copy the restore files.