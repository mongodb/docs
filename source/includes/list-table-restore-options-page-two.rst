.. list-table::
   :widths: 35 65

   * - :guilabel:`Pull Via Secure HTTP`

     - Create a one-time direct download link. If you select this, click
       :guilabel:`Finalize Request` and skip the rest of this procedure.

   * - :guilabel:`Push Via Secure Copy`

     - Direct |mms| to copy the restore files to your server via ``SCP``. To
       use this option you must have an existing key pair that |mms| can
       use to transmit the files. See
       :doc:`/tutorial/generate-key-pair-for-scp-restores`.

   * - :guilabel:`Format`

     - Sets the format of the restore files:

       - :guilabel:`Individual DB Files`: Transmits MongoDB data files
         produced by |mms| Backup directly to the target directory. The
         data *is* compressed during transmission.

       - :guilabel:`Archive (tar.gz)`: Delivers database files in a single
         ``tar.gz`` file that you must extract before reconstructing databases.
         With :guilabel:`Archive (tar.gz)` delivery, you need sufficient
         space on the destination server for the archive *and* the 
         extracted files.

   * - :guilabel:`SCP Host`

     - The hostname of the server to receive the files.

   * - :guilabel:`SCP Port`

     - The port of the server to receive the files.

   * - :guilabel:`SCP User`

     - The username used to access to the server.

   * - :guilabel:`Auth Method`

     - Select whether to use a username and password or an SSH certificate
       to authenticate to the server.

   * - :guilabel:`Password`

     - The user password used to access to the server.

   * - :guilabel:`Passphrase`

     - The SSH passphrase used to access to the server.

   * - :guilabel:`Target Directory`

     - The absolute path to the directory on the server to which to copy
       the restore files.
