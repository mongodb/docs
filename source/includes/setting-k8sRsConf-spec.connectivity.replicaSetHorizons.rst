.. setting:: spec.connectivity.replicaSetHorizons

   *Type*: collection

   Allows you to provide different |dns| settings for client
   applications and the {+mdbagent+}s. The |k8s-op-short| uses split
   horizon |dns| for replica set members. This feature allows
   communication both within the |k8s| cluster and from outside |k8s|.
   
   You may add multiple external mappings per host.
   
   .. note:: Split Horizon Requirements
   
      - Make sure that each value in this array is unique.
   
      - Make sure that the number of entries in this array matches the
        value given in :setting:`spec.members`.
   
      - Provide a value for the
        :setting:`spec.security.certsSecretPrefix` setting to
        enable |tls|. This method to use split horizons requires the
        Server Name Indication extension of the |tls| protocol.
   
      - :ref:`Configure the routing for external hostnames <connect-from-outside-k8s>`.
   
   .. example::
   
      In this example, the replica set members communicate amongst
      themselves on the ``example-localhost`` horizon. Clients
      communicate with the replica set using the ``example-website``
      horizon.
   
      .. literalinclude:: /includes/code-examples/yaml-files/example-replica-set.yaml
         :language: yaml
         :start-after: START-horizon-addcert-replset-upper
         :end-before: END-horizon-addcert-replset-upper
         :linenos:
         :lineno-start: 1
         :copyable: false
   
      .. literalinclude:: /includes/code-examples/yaml-files/example-replica-set.yaml
         :language: yaml
         :start-after: START-horizon-addcert-replset-lower
         :end-before: END-horizon-addcert-replset-lower
         :linenos:
         :lineno-start: 15
         :emphasize-lines: 1-8
   

