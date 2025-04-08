.. setting:: spec.security.authentication.agents.clientCertificateSecretRef.name

   *Type*: string

   
   Specifies the |k8s-secret| that contains the {+mdbagent+}\'s
   |tls| certificate. If omitted, defaults to ``agent-certs``.
   
   This secret must contain the ``mms-automation-agent-pem`` key. The
   value of this key must be a |tls| certificate that can be validated
   by the server.

   You must create this secret in the same namespace to which you
   deploy the |k8s-op-short|:
   
   .. code-block:: sh
   
     kubectl create secret generic agent-certs \
     --from-file=mms-automation-agent-pem=<automation-cert.pem> \
     --namespace=<metadata.namespace>
