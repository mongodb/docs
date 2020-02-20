.. list-table::
   :widths: 20 10 10 40 20
   :header-rows: 1

   * - Key
     - Type
     - Necessity
     - Description
     - Example

   * - :setting:`spec.exposedExternally`
     - Boolean
     - Optional
     - Set this value to ``true`` to allow external services to connect
       to the MongoDB deployment. This results in |k8s| creating a
       :k8sdocs:`NodePort service </concepts/services-networking/service/#nodeport>`.
     - ``true``

   * - | ``spec.security``
       | :setting:`.tls.enabled<spec.security.tls.enabled>`
     - boolean
     - Optional
     - If this value is ``true``, |tls| is enabled on the MongoDB
       deployment.

       By default, |k8s-op-short| requires hosts to use and
       accept |tls| encrypted connections.
     - ``true``

   * - | ``spec.security.tls``
       | :setting:`.additionalCertificateDomains<spec.security.tls.additionalCertificateDomains>`
     - collection
     - Optional
     - List of every domain that should be added to |tls| certificates
       to each pod in this deployment. When you set this parameter,
       every |csr| that the |k8s-op-short| transforms into a |tls|
       certificate includes a |san-dns| in the form ``<pod
       name>.<additional cert domain>``.
     - ``true``
