.. procedure::
   :style: normal

   .. step:: Conditional. Install the ``cert-manager``.

      The ``cert-manager`` is required for managing |tls| certificates,
      which secure connections between ``mongod`` and ``mongot`` pods.
      If you already have ``cert-manager`` installed in your cluster,
      skip this step. Otherwise, install ``cert-manager``.

      To install ``cert-manager`` in the ``cert-manager`` namespace,
      run the following commands in your terminal:

      .. literalinclude:: /includes/code-examples/search/04-search-external-mongod/code_snippets/04_0304_install_cert_manager.sh
         :language: shell
         :copyable: true
         :linenos:

   .. step:: Conditional. Prepare certificate issuer and CA infrastructure.

      If you already have a CA and cert-manager issuer, skip this step and
      update ``MDB_TLS_CA_ISSUER``, ``MDB_TLS_CA_CONFIGMAP``, and
      ``MDB_TLS_CA_SECRET_NAME`` environment variables to reference your
      existing resources. Otherwise, create the certificate authority
      infrastructure that will issue |tls| certificates for ``MongoDB``
      and ``MongoDBSearch`` resources.

      These commands perform the following actions:

      - Create a self-signed ``ClusterIssuer``.
      - Generate a CA certificate and wait for it to be ready.
      - Create a CA ``ClusterIssuer`` backed by the CA certificate
        that all namespaces can use.
      - Distribute the CA certificate to the MongoDB namespace as
        a ``ConfigMap`` and ``Secret`` so MongoDB resources can
        reference it for |tls| verification.

      .. literalinclude:: /includes/code-examples/search/04-search-external-mongod/code_snippets/04_0306_prepare_cert_manager_issuer.sh
         :language: shell
         :copyable: true
         :linenos:

      The CA is distributed as both a ConfigMap (``ca-pem`` key) and a
      Secret (``ca.crt`` key) in the target namespace.

   .. step:: Required. Create |tls| certificates.

      Create |tls| certificates for the MongoDB server and the
      ``mongot`` search pods. The script issues two certificates
      signed by the CA created in the previous step:

      - A **server certificate** for the external MongoDB replica set
        members, covering their DNS names and the headless service
        wildcard.
      - A **search certificate** for the ``mongot`` pods, covering the
        search headless service wildcard and the search service
        endpoint.

      .. literalinclude:: /includes/code-examples/search/04-search-external-mongod/code_snippets/04_0307_issue_tls_certificates.sh
         :language: shell
         :copyable: true
         :linenos:

   .. step:: Required. Create and load the MongoDB user secrets.

      The ``mongot`` process requires authentication credentials to
      connect to your external MongoDB deployment for creating search
      indexes and running search queries. This step creates the
      following |k8s| secrets:

      - ``mdb-admin-user-password`` - credentials for the MongoDB administrator.
      - ``mdb-user-password`` - credentials for the user authorized to perform search queries.
      - ``mdbs-search-sync-source-password`` - credentials for a
        dedicated search user used internally by the ``mongot`` process
        to synchronize data and manage indexes.

      |k8s-op-short| mounts these secrets into the MongoDB pods.

      To create the secrets, copy, paste, and run the following in the
      namespace where you plan to deploy |text-search| and
      |vector-search|:

      .. io-code-block::
         :copyable: true

         .. input:: /includes/code-examples/search/04-search-external-mongod/code_snippets/04_0305_create_mongodb_community_user_secrets.sh
            :language: shell
            :linenos:

         .. output::
            :linenos:
            :visible: false

            secret/mdb-admin-user-password created
            secret/mdbs-search-sync-source-password created
            secret/mdb-user-password created