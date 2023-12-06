.. setting:: mms.emailDaoClass

   *Type*: string

   *Default*: ``SIMPLE_MAILER``

   
   Email interface to use.
   
   This setting is labeled in different ways for the user interface and
   the configuration file.
   
   
   .. list-table::
      :widths: 30 70
      :header-rows: 1
      :stub-columns: 1
   
      * - Delivery Method
        - Configuration Setting (``mms.emailDaoClass``)
      * - |aws| |ses|
        - ``AWS_MAILER``
      * - |smtp|
        - ``SIMPLE_MAILER``
   
   
   If you set this to |smtp| Email Server, you must set:
   
   
   - :setting:`mms.mail.transport`
   - :setting:`mms.mail.hostname`
   - :setting:`mms.mail.port`
   - :setting:`mms.mail.username`
   - :setting:`mms.mail.password`
   - :setting:`mms.mail.tls`
   
   
   If you set this to |aws| Simple Email Service, you must set:
   
   
   - :setting:`aws.ses.endpoint`
   - :setting:`aws.accesskey`
   - :setting:`aws.secretkey`
   
   
   Corresponds to :setting:`Email Delivery Method Configuration`.
   

