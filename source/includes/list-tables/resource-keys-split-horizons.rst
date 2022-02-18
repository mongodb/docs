.. list-table::
   :widths: 20 10 10 40 20
   :header-rows: 1

   * - Key
     - Type
     - Necessity
     - Description
     - Example

   * - | ``spec.connectivity``
       | :setting:`.replicaSetHorizons<spec.connectivity.replicaSetHorizons>`
     - collection
     - Conditional
     - Add this parameter and values if you need your database to be
       accessed outside of |k8s|. This setting allows you to provide
       different |dns| settings within the |k8s| cluster and to the
       |k8s| cluster. The |k8s-op-short| uses split horizon |dns| for
       replica set members. This feature allows communication both
       within the |k8s| cluster and from outside |k8s|.

       You may add multiple external mappings per host.

       .. admonition:: Split Horizon Requirements
          :class: note

          - Make sure that each value in this array is unique.

          - Make sure that the number of entries in this array matches
            the value given in :setting:`spec.members`.

          - Provide a value for the
            :setting:`spec.security.certsSecretPrefix` setting to
            enable |tls|. This method to use split horizons requires the
            Server Name Indication extension of the |tls| protocol.
     - :setting:`See Setting<spec.connectivity.replicaSetHorizons>`

   * - | ``spec.security``
       | :setting:`.tls.certsSecretPrefix<spec.security.tls.certsSecretPrefix>`
     - string
     - Required
     - Add the ``<prefix>`` of the secret 
       name that contains your MongoDB deployment's |tls| certificates.
     - ``devDb``
