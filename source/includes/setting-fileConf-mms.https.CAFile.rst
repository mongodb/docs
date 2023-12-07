.. setting:: mms.https.CAFile

   *Type*: string

   
   Required if:
   
   - You are using a private certificate authority.
   - You set :setting:`mms.https.ClientCertificateMode` to
     ``agents_only`` or ``required``.
   - You run |mms| in hybrid mode with |tls| enabled.
   
   Specifies the filesystem location of a private certificate authority
   file containing the list of acceptable client certificates. The
   |application| authenticates |https| requests from clients bearing a
   certificate described in this file.
   
   .. code-block:: ini
   
      mms.https.CAFile=/path/to/ca_file.pem
   
   
   Corresponds to :setting:`CA File`.
   

