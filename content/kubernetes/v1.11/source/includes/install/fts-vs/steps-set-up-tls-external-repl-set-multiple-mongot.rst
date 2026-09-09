.. procedure::
   :style: normal

   .. step:: Conditional. Install the ``cert-manager``. 

      The ``cert-manager`` is required for managing |tls| certificates,
      which secure connections between ``mongod``, the Envoy load
      balancer, and ``mongot`` pods. If you already have ``cert-manager``
      installed in your cluster, skip this step. Otherwise, install
      ``cert-manager``.

      To install ``cert-manager`` in the ``cert-manager`` namespace,
      run the following commands in your terminal: 

      .. literalinclude:: /includes/code-examples/search/10-search-external-rs-mongod-managed-lb/code_snippets/10_0301_install_cert_manager.sh
         :copyable: true
         :language: shell
         :linenos:

   .. step:: Conditional. Prepare certificate issuer and CA infrastructure.

      If you already have a CA and cert-manager issuer, skip this step and 
      update ``MDB_TLS_CA_ISSUER``, ``MDB_TLS_CA_CONFIGMAP``, and 
      ``MDB_TLS_CA_SECRET_NAME`` environment variables to reference your 
      existing resources. Otherwise, create the certificate authority 
      infrastructure that will issue |tls| certificates for ``MongoDB`` 
      and ``MongoDBSearch`` resources. 

      These commands create the ``cert-manager`` bootstrap chain and distribute 
      the CA certificate to the target namespace:

      .. figure:: /images/cert_manager_bootstrap_chain.png
         :figwidth: 720px
         :alt: cert-manager bootstrap chain: Self-Signed ClusterIssuer signs CA Certificate, stored in CA ClusterIssuer, which signs all other certs
         :lightbox:
      
      Specifically, these commands perform the following actions:

      - Create a self-signed ``ClusterIssuer``.
      - Generate a CA certificate and wait for it to be ready.
      - Create a CA ``ClusterIssuer`` backed by the CA certificate
        that all namespaces can use.
      - Distribute the CA certificate to the MongoDB namespace as
        a ``ConfigMap`` and ``Secret`` so MongoDB resources can
        reference it for |tls| verification.

      .. literalinclude:: /includes/code-examples/search/10-search-external-rs-mongod-managed-lb/code_snippets/10_0302_configure_tls_prerequisites.sh
         :language: shell
         :copyable: true
         :linenos:

      The CA is distributed as both a ConfigMap (``ca-pem`` key) and a 
      Secret (``ca.crt`` key) in the target namespace.

   .. step:: Required. Create ``mongot`` TLS certificates.

      Create a |tls| certificate for the ``mongot`` pods. The certificate
      uses a wildcard DNS name to cover all pods in the ``mongot``
      StatefulSet headless service. The ``certsSecretPrefix`` field in
      the CR (``MDB_TLS_CERT_SECRET_PREFIX``) determines how the
      operator locates the certificate secret.

      .. literalinclude:: /includes/code-examples/search/10-search-external-rs-mongod-managed-lb/code_snippets/10_0316a_create_mongot_tls_certificates.sh
         :language: shell
         :copyable: true
         :linenos:

   .. step:: Required.Create load balancer TLS certificates.

      Create |tls| certificates for the managed Envoy load balancer.
      The load balancer requires two certificates signed by the same CA:

      - A **server certificate** for accepting incoming connections
        from ``mongod``. This certificate includes the load balancer
        service DNS name and a namespace wildcard.
      - A **client certificate** for making outgoing connections
        to ``mongot`` pods. This certificate uses a namespace
        wildcard DNS name.

      .. literalinclude:: /includes/code-examples/search/10-search-external-rs-mongod-managed-lb/code_snippets/10_0316b_create_lb_tls_certificates.sh
         :language: shell
         :copyable: true
         :linenos: