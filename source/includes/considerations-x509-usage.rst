.. important::
   A full description of Public Key Infrastructure (PKI), including
   certificates and Certificate Authorities, is beyond the scope of this
   tutorial. This tutorial assumes prior knowledge of SSL and PKI as well as
   access to valid x.509 certificates.

To enable x.509 Authentication for |mms|, you must:

- Obtain valid certificate files (PEM Key files) generated and signed by a
  single certificate authority (CA) for:

  - Certificate Only in PEM file:

    - The CA itself

  - Certificate and Private Key in PEM file:

    - Each agent (Automation, Monitoring if used and Backup if used)
    - Each hostname of a managed MongoDB server (if member X.509 authentication is used)
    - Each client that may attach to the MongoDB instance

- Generate LDAPv3 distinguished name from each Agents' PEM Key file. Consult
  the documentation for whichever SSL implementation you use.

  .. example::

     For OpenSSL, the command to generate the LDAPv3 DN from a PEM Key File called ``automation.pem`` is::

      openssl x509 -in automation.pem -inform PEM -subject -nameopt RFC2253

.. note::
   See :manual:`Client x.509 Certificate </tutorial/configure-x509-client-authentication>` 
   in the MongoDB Manual for certificate requirements.

.. important::
   If at any point you wish to reset the authentication settings for your
   project and start again, see :doc:`/tutorial/clear-security-settings` for
   more information.