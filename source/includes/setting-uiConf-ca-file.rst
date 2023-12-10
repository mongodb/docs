.. setting:: CA File

   *Type*: string

   
   Required if:
   
   - You are using a private certificate authority.
   - You set :setting:`Client Certificate Mode` to
     :guilabel:`Required for Agents Only` or :guilabel:`Required for All Requests`.
   - You run |mms| in hybrid mode with |tls| enabled.
   
   Specifies the filesystem location of a private certificate authority
   file containing the list of acceptable client certificates. The
   |application| authenticates |https| requests from clients bearing a
   certificate described in this file.
   
   .. code-block:: ini
   
      /path/to/ca_file.pem
   
   
   Corresponds to :setting:`mms.https.CAFile`.
   

