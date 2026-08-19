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

      .. literalinclude:: /includes/code-examples/search/07-search-external-sharded-mongod-managed-lb/code_snippets/07_0301_install_cert_manager.sh
         :copyable: true
         :language: shell
         :linenos:

   .. step:: Conditional. Prepare certificate issuer and CA infrastructure.

      If you already have a CA and cert-manager issuer, skip this step and
      update ``MDB_TLS_CA_ISSUER``, ``MDB_TLS_CA_CERT_NAME``, and
      ``MDB_TLS_CA_SECRET_NAME`` environment variables to reference your
      existing resources. Otherwise, create the certificate authority
      infrastructure that will issue |tls| certificates for ``MongoDB``
      and ``MongoDBSearch`` resources.

      This command creates the ``cert-manager`` bootstrap chain needed
      before any certificates can be issued:

      .. figure:: /images/cert_manager_bootstrap_chain_sharded.png
         :figwidth: 740px
         :width: 740px
         :alt: cert-manager bootstrap chain: Self-Signed ClusterIssuer signs CA Certificate, stored in CA ClusterIssuer, which signs all mongot, LB, and mongod certs

      .. list-table::
         :header-rows: 1
         :widths: 30 30 40

         * - ``cert-manager`` Object
           - Environment Variables
           - Purpose
         * - Self-Signed ClusterIssuer
           - ``MDB_TLS_SELF_SIGNED_ISSUER``
           - Serves as the bootstrap issuer that signs only the CA
             certificate itself.
         * - CA Certificate (``isCA: true``)
           - | ``MDB_TLS_CA_CERT_NAME`` 
             | ``MDB_TLS_CA_SECRET_NAME``
           
           - Acts as the root certificate authority. Stored as a Secret
             in the ``cert-manager`` namespace.
         * - CA ClusterIssuer
           - ``MDB_TLS_CA_ISSUER``
           - References the CA Secret and signs all ``mongot``, load
             balancer, and ``mongod`` certificates.

      To create the CA infrastructure, copy, paste, and run the following commands:

      .. literalinclude:: /includes/code-examples/search/07-search-external-sharded-mongod-managed-lb/code_snippets/07_0302_configure_tls_prerequisites.sh
         :language: shell
         :copyable: true
         :linenos:

   .. step:: Required. Distribute the CA certificate for ``mongot`` to the MongoDB namespace.

      Copy the CA certificate from the ``cert-manager`` namespace into
      the MongoDB namespace (``MDB_NS``) as a generic Secret. The
      ``mongot`` pods reference this Secret for |tls| verification.

      .. literalinclude:: /includes/code-examples/search/07-search-external-sharded-mongod-managed-lb/code_snippets/07_0302b_configure_tls_prerequisites_mongot.sh
         :language: shell
         :copyable: true
         :linenos:

   .. step:: Required. Create ``mongot`` TLS certificates.

      .. note::

         For a sharded deployment, you need the following |tls|
         certificates in total (plus the CA chain created above):

         - **1 mongot certificate per shard** — each covers that
           shard's ``mongot`` pod DNS names.
         - **1 load balancer server certificate** — presented to
           ``mongod`` during the inbound TLS handshake.
         - **1 load balancer client certificate** — used by Envoy to
           initiate mTLS connections to ``mongot`` pods.

         For example, a 2-shard cluster requires **4 certificates**, 
         which are two ``mongot`` certificates, one load balancer 
         server certificate, and one load balancer client certificate.

      Create a |tls| certificate for each shard's ``mongot`` pods. Each
      certificate includes per-pod DNS names and a wildcard for the
      shard's headless service. The ``certsSecretPrefix`` field in the
      ``MongoDBSearch`` CR (``MDB_TLS_CERT_SECRET_PREFIX``) determines
      how the operator locates these secrets.

      .. literalinclude:: /includes/code-examples/search/07-search-external-sharded-mongod-managed-lb/code_snippets/07_0316a_create_mongot_tls_certificates.sh
         :language: shell
         :copyable: true
         :linenos:

   .. step:: Required. Create load balancer TLS certificates.

      The Envoy proxy terminates one mTLS session (from ``mongod``) and
      initiates another (to ``mongot``), so it needs **two** certificates:

      .. list-table::
         :header-rows: 1
         :widths: 30 30 40

         * - Certificate
           - Secret Name Pattern
           - Purpose

         * - Server
           - ``{prefix}-{name}-search-lb-0-{shardName}-cert``
           - Presented to ``mongod`` during the inbound TLS handshake.

         * - Client
           - ``{prefix}-{name}-search-lb-0-client-cert``
           - Used to initiate mTLS connections to ``mongot`` pods.

      .. literalinclude:: /includes/code-examples/search/07-search-external-sharded-mongod-managed-lb/code_snippets/07_0316b_create_lb_tls_certificates.sh
         :language: shell
         :copyable: true
         :linenos:
