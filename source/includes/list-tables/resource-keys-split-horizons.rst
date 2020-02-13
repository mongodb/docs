.. list-table::
   :widths: 20 10 10 40 20
   :header-rows: 1

   * - Key
     - Type
     - Necessity
     - Description
     - Example

   * - | ``spec.security.tls``
       | :setting:`.enabled<spec.security.tls.enabled>`
     - boolean
     - Optional
     - Set this value to ``true`` to enable |tls| on the MongoDB
       deployment.

       By default, |k8s-op-short| requires hosts to use and accept
       |tls| encrypted connections. This value defaults to ``true``.
     - ``true``

   * - | ``spec.security.tls``
       | :setting:`.additional<spec.security.tls.additionalCertificateDomains>`
       | :setting:`CertificateDomains<spec.security.tls.additionalCertificateDomains>`
     - collection
     - Conditional
     - Add any domains that should be added to |tls| certificates for
       this deployment. When you set this parameter, every |csr| that
       the |k8s-op-short| transforms into a |tls| certificate includes
       a |san-dns| in the form ``<pod name>.<additional cert domain>``.

       .. example::

          In this example, this would result in three certificates, one
          for each member of the replica set, with |san-dns|\s of:

          - ``my-replica-set-0.web.example.com``
          - ``my-replica-set-1.web.example.com``
          - ``my-replica-set-2.web.example.com``

     - :setting:`See Setting<spec.security.tls.additionalCertificateDomains>`

   * - | ``spec.connectivity``
       | ``.replicaSetHorizons``
     - collection
     - Conditional
     - Add this parameter and values if you need your database to be
       accessed outside of |k8s|. This setting allows you to provide
       different |dns| settings for client applications and the
       {+mdbagent+}s. The |k8s-op-short| uses split horizon |dns| for
       replica set members horizons to allow the:

       - {+mdbagent+}s to communicate with each other on the internal
         horizon within |k8s|
       - clients to communicate with the replica set using the external
         horizon outside |k8s|

       .. admonition:: Split Horizon Requirements
          :class: note

          - Make sure that each value in this array is unique.

          - Make sure that the number of entries in this array matches
            the value given in :setting:`spec.members`.

          - Set the :setting:`spec.security.tls.enabled` to ``true`` to
            enable |tls|. This method to use split horizons requires
            the Server Name Indication extension of the |tls| protocol.
     - :setting:`See Setting<spec.connectivity.replicaSetHorizons>`
