.. _atlas_2026_02_23:

23 February 2026 Release
------------------------

- Standardizes {+atlas-admin-api+} :ref:`rate limiting <api-rate-limiting>` 
  to use the {+token-bucket+}. Rate limits vary by endpoint set and scope 
  (organization, project, user, or IP address). This approach provides 
  predictable performance with burst capability and adds response headers 
  that offer visibility into rate limit quotas, current usage, and reset times.

.. _atlas_2026_02_19:

19 February 2026 Release
------------------------

- Introduces port mapping architecture for {+gcp+} :ref:`Private Service 
  Connect endpoints <private-endpoint-concepts>`. This new architecture improves 
  scalability and simplifies the management of private endpoints by mapping 
  cluster connections to specific ports through a single service attachment. 
  Port mapping is now the preferred method for new private 
  endpoints in {+gcp+}, while existing legacy endpoints remain fully supported.

.. _atlas_2026_02_12:

12 February 2026 Release
------------------------

- Adds support for secretless authentication when using {+azure+} Key
  Vault with :ref:`Encryption at Rest <security-kms-encryption>`.
  Instead of providing static credentials, you authorize an
  |service|-managed {+azure+} Service Principal that authenticates
  using short-lived OAuth 2.0 tokens. This eliminates the need to
  create, store, and rotate client secrets. 
  
  This update also introduces support for unversioned Key Vault key URIs
  (``/keys/<key-name>``), which automatically resolve to the latest
  enabled key version. 
  
  To learn more, see :ref:`security-azure-kms-secretless`.

