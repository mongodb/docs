.. setting:: spec.security.authentication.agents.clientCertificateSecretRef.name

   *Type*: string


   Specifies the |k8s-secret| that contains the {+mdbagent+}\'s
   |tls| certificate. If omitted, defaults to ``agent-certs``.

   You must create this secret in the same namespace to which you
   deploy the |k8s-op-short| and the secret must be
   of type ``kubernetes.io/tls``.
