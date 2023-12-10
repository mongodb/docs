.. setting:: Path to SP Certificate PEM Key File

   *Type*: string

   
   Absolute path to the PEM file for the certificate that the |saml-sp|
   uses to sign requests, containing both the private and public key. If
   this is left blank, |onprem| doesn't sign |saml| auth requests to the
   |idp| and you can't encrypt |saml| assertions.
   

