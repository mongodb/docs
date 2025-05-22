MongoDB employs role-based access control (RBAC) to determine access
for users. A user is granted one or more :ref:`roles <roles>` that
determine the user's access or privileges to MongoDB :ref:`resources
<resource-document>` and the :ref:`actions <security-user-actions>`
that user can perform. A user should have only the minimal set of
privileges required to ensure a system of :term:`least privilege`.

Each application and user of a MongoDB system should map to a distinct
user. This *access isolation* facilitates
access revocation and ongoing user maintenance. 
