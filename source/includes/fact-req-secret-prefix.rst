You must prefix your secrets with ``<prefix>-<metadata.name>`` if both
of the following items are true:

- You set :setting:`spec.security.certsSecretPrefix` or 
  :setting:`spec.security.tls.secretRef.prefix`
- You omit :setting:`spec.security.tls.secretRef.name`.
