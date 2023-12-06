.. setting:: Email Delivery Method Configuration

   *Type*: string

   *Default*: SMTP Email Server

   
   Email interface to use.
   
   This setting is labeled in different ways for the user interface and
   the configuration file.
   
   
   .. list-table::
      :widths: 40 60
      :header-rows: 1
   
      * - Delivery Method
        - UI Setting
      * - |aws| |ses|
        - AWS Simple Email Service
      * - |smtp|
        - SMTP Email Server
   
   
   If you set this to |smtp| Email Server, you must set:
   
   
   - :setting:`Transport`
   - :setting:`SMTP Server Hostname`
   - :setting:`SMTP Server Port`
   - :setting:`Username`
   - :setting:`Password`
   - :setting:`Use SSL`
   
   
   If you set this to |aws| Simple Email Service, you must set:
   
   
   - :setting:`AWS Endpoint`
   - :setting:`AWS Access Key`
   - :setting:`AWS Secret Key`
   
   
   Corresponds to :setting:`mms.emailDaoClass`.
   

