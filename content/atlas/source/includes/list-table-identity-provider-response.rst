.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 22 14 66

   * - Name
     - Type
     - Description

   * - acsUrl
     - string
     - Assertion consumer service URL to which the |idp| sends the SAML
       response.

   * - associatedDomains
     - array
     - List that contains the configured domains from which users can
       log in for this |idp|.

   * - associatedOrgs
     - array
     - List that contains the organizations from which users can log in
       for this |idp|.

   * - audienceUri
     - string
     - Identifier for the intended audience of the `SAML Assertion
       <http://saml.xml.org/assertions>`__.

   * - displayName
     - string
     - Human-readable label that identifies the |idp|.

   * - issuerUri
     - string
     - Identifier for the issuer of the `SAML Assertion
       <http://saml.xml.org/assertions>`__.

   * - oktaIdpId
     - string 
     - Unique 20-hexadecimal digit string that identifies the |idp|.

   * - pemFileInfo
     - array
     - List that contains the file information, including: start date,
       and expiration date for the identity provider's |pem|-encoded
       public key certificate.

       .. list-table::
          :header-rows: 1
          :widths: 30 30 40
          :stub-columns: 1

          * - Name
            - Type
            - Description
    
          * - certificates
            - array
            - List that contains the start date and expiration date for
              the identity provider's |pem|-encoded public key
              certificate.

          * - fileName
            - string 
            - Label that identifies the file containing the identity
              provider's |pem|-encoded public key certificate.

   * - requestBinding
     - string
     - |saml| Authentication Request Protocol binding used to send the
       AuthNRequest. |service| supports the following binding values:

       - ``HTTP POST``
       - ``HTTP REDIRECT``

   * - responseSignatureAlgorithm
     - string
     - Algorithm used to encrypt the |idp| signature. |service|
       supports the following signature algorithm values:

       - ``SHA-1``
       - ``SHA-256``

   * - ssoDebugEnabled
     - boolean
     - Flag that indicates whether the |idp| has enabled **Bypass SAML
       Mode**. Enabling this mode generates a |url| that allows you
       bypass |saml| and login to your organizations at any point. You
       can authenticate with this special |url| only when Bypass Mode
       is enabled. Set this parameter to ``true`` during testing. This
       keeps you from getting locked out of MongoDB.

   * - ssoUrl
     - string
     - URL of the receiver of the |saml| AuthNRequest.

   * - status
     - string
     - Label that indicates whether the identity provider is active.
       The |idp| is :guilabel:`Inactive` until you :ref:`map at least
       one domain <atlas-manage-fed-domain-map>` to the |idp|.
