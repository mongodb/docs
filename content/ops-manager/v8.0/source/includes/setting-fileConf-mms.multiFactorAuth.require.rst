.. setting:: mms.multiFactorAuth.require

   *Type*: boolean

   *Default*: False

   
   When ``true``, Ops Manager will require two-factor authentication for
   users to log in or to perform certain destructive operations within
   the application.
   
   If you configure
   :ref:`Twilio integration <twilio-sms-alert-settings>`,
   users may obtain their second factor tokens via Google
   Authenticator, SMS, or voice calls. Otherwise, the only mechanism
   to provide two-factor authentication is Google Authenticator.
   
   

