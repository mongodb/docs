.. setting:: spec.security.roles

   *Type*: array

   
   Array that defines :manual:`User-defined roles
   </core/security-user-defined-roles/>` that give you
   fine-grained access control over your MongoDB deployment.
   
   To enable user-defined roles, the
   :setting:`spec.security.authentication.enabled` must be ``true``.
   
   .. example::
   
      In this example, a user-defined role named ``customRole`` allows
      users assigned this role to:
   
      - Insert documents into the ``cats`` collection in the ``pets``
        database, and
      - Find and insert documents into the ``dogs`` collection in the
        ``pets`` database.
   
      .. literalinclude:: /includes/code-examples/yaml-files/example-custom-role.yaml
         :language: yaml
         :linenos:
         :emphasize-lines: 15-34
   

