.. setting:: mms.saml.signature.algorithm

   *Type*: string

   
   Algorithm to encrypt the signature sent to and from the |idp|.
   
   You must use one of the following full W3.org signature algorithm values:
   
   - ``http://www.w3.org/2001/04/xmldsig-more#rsa-sha1``
   - ``http://www.w3.org/2000/09/xmldsig#dsa-sha1``
   - ``http://www.w3.org/2001/04/xmldsig-more#rsa-sha256``
   - ``http://www.w3.org/2001/04/xmldsig-more#rsa-sha384``
   - ``http://www.w3.org/2001/04/xmldsig-more#rsa-sha512``

   .. important::

      You must specify the complete W3.org signature algorithm URL, not 
      a simple string value. Using simple string values, such as ``rsa-sha256``, 
      causes |onprem| to return an ``unauthorized`` error because the 
      |idp| cannot validate the signatures properly.

   **Example:**

   .. code-block:: text

      mms.saml.signature.algorithm=http://www.w3.org/2001/04/xmldsig-more#rsa-sha256
   

