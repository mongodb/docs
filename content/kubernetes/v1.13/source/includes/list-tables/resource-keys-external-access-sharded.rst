.. list-table::
   :widths: 20 10 10 40 20
   :header-rows: 1

   * - Key
     - Type
     - Necessity
     - Description
     - Example

   * - | ``spec.security``
       | :setting:`.certsSecretPrefix<spec.security.certsSecretPrefix>`
     - string
     - Required
     - Add the ``<prefix>`` of the secret 
       name that contains your MongoDB deployment's |tls| certificates.
     - ``devDb``

   * - | ``spec.security.tls``
       | :setting:`.additionalCertificateDomains<spec.security.tls.additionalCertificateDomains>`
     - collection
     - Optional
     - List of every domain that should be added to |tls| certificates
       to each pod in this deployment. When you set this parameter,
       every |csr| that the |k8s-op-short| transforms into a |tls|
       certificate includes a |san-dns| in the form ``<pod
       name>.<additional cert domain>``.
     - ``example.com``
