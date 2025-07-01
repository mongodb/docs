.. setting:: SAML Signed Messages

   *Type*: boolean

   *Default*: ``true``

   Flag that indicates whether or not the |idp| signs the responses
   it sends to |onprem|.

   .. important:: 

      Ensure that either the assertions or the response are signed. 
      The configuration will fail the verification and |onprem| returns 
      an error if either the assertions or the response aren't signed.

   Corresponds to :setting:`mms.saml.signedMessages`.
