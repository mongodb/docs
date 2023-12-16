.. setting:: mms.multiFactorAuth.allowReset

   *Type*: boolean

   *Default*: False

   
   When ``true``, |mms| allows users to reset their two-factor
   authentication settings via email in an analogous fashion to
   resetting their passwords.
   
   To reset two-factor authentication, a user must:
   
   - be able to receive email at the address associated with the user
     account.
   - know the user account's password.
   - know the :opsmgr:`agent API key </reference/glossary/#term-agent-api-key>` for each |mms| project the user
     belongs to.
   
   Corresponds to :setting:`Multi-factor Auth Allow Reset`.
   

