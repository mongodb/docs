
Configure member authentication for each server in the replica set.

.. tabs::

   .. tab:: X.509 Authentication
      :tabid: convert-config-rs-x509

      Configure the replica set to use X.509 certificates for internal member
      authentication.

      .. list-table::
         :header-rows: 1

         * - Setting
           - Option
           - Description

         * - :setting:`net.tls.mode`
           - :option:`--tlsMode <mongod --tlsMode>`
           - Sets the TLS mode to use in authentication.  To configure the server
             to require X.509 certificate authentication, set this option to
             ``requireTLS``.
         * - :setting:`net.tls.certificateKeyFile`
           - :option:`--tlsCertificateKeyFile <mongod --tlsCertificateKeyFile>`
           - Sets the path to the ``.pem`` file that contains the TLS certificate
             for client connections.
         * - :setting:`net.tls.CAFile`
           - :option:`--tlsCAFile <mongod --tlsCAFile>`
           - Sets the path to the file that contains the root certificate chain
             for the Certificate Authority (CA).
         * - :setting:`net.tls.clusterFile`
           - :option:`--tlsClusterFile <mongod --tlsClusterFile>`
           - Sets the path to the ``.pem`` file that contains the TLS certificate
             for cluster member connections.
         * - :setting:`security.clusterAuthMode`
           - :option:`--clusterAuthMode <mongod --clusterAuthMode>`
           - Sets the mode used to authenticate cluster members. To use X.509
             authentication, set this option to ``x509``.

      For example:

      .. code-block:: yaml

         replication:
           replSetName: "rs0"
         security:
           clusterAuthMode: x509
         net:
           tls:
             mode: requireTLS
             certificateKeyFile: /etc/mongodb/client.pem
             CAFile: /etc/mongodb/ca.pem
             clusterFile: /etc/mongodb/member.pem

   .. tab:: Keyfile Authentication
      :tabid: config-rs-keyfile

      Configure the replica set to use keyfiles for internal member authentication.
      To authenticate, each member must have a copy of the same keyfile.

      .. list-table::
         :header-rows: 1

         * - Setting
           - Option
           - Description
         * - :setting:`security.keyFile`
           - :option:`--keyFile <mongod --keyFile>`
           - Sets the path to the replica set keyfile.

      For example:

      .. code-block:: yaml

        replication:
           replSetName: "rs0"
        security:
            keyFile: /etc/mongodb/keyfile

   .. tab:: No Authentication
      :tabid: config-rs-noauth

      Configures a replica set without authorization.

      .. warning::

         You should only use this configuration for internal replica sets that
         are **not** accessible through the network.

      .. list-table::
         :header-rows: 1

         * - Setting
           - Option
           - Description

         * - :setting:`net.bindIp`
           - :option:`--bind_ip <mongod --bind_ip>`
           - Sets the hostnames or IP addresses that MongoDB listens on for client
             connections. To block network access to the server, set this option
             to ``localhost``.

      For example:

      .. code-block:: yaml

         replication:
           replSetName: "rs0"
         net:
            bindIp: localhost
