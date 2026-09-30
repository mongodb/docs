- A |mms| or Cloud Manager connection ``ConfigMap`` with the keys
  ``baseUrl``, ``orgId``, and ``projectName``.

- An API key ``Secret`` with the keys ``publicKey`` and
  ``privateKey``.

- The |k8s-op-short| ``ServiceAccount`` has ``batch/jobs``
  permissions (``create``, ``get``, ``list``, ``watch``, and
  ``delete``) for the dry-run connectivity Job.

- The project contains exactly one deployment.
