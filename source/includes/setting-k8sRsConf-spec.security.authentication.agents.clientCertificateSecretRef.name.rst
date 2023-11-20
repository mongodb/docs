.. setting:: spec.security.authentication.agents.clientCertificateSecretRef.name

   *Type*: string

   
   Specifies the |k8s-secret| that contains the {+mdbagent+}'s
   |tls| certificate. If omitted, defaults to ``agent-certs``.
   
   This secret must contain the following keys, the 
   values of which are |tls| certificates that can be validated by the 
   server:
   
   - ``mms-automation-agent-pem``
   - ``mms-backup-agent-pem``
   - ``mms-monitoring-agent-pem``
   
   You must create this secret in the same namespace to which you
   deploy the |k8s-op-short|:
   
   .. code-block:: sh
   
      kubectl create secret generic agent-certs \
      --from-file=mms-automation-agent-pem=<automation-cert.pem> \
      --from-file=mms-backup-agent-pem=<backup-cert.pem> \
      --from-file=mms-monitoring-agent-pem=<monitoring-cert.pem> \
      --namespace=<metadata.namespace>
   

