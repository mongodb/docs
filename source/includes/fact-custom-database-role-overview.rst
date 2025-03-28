You can create custom roles in |service| when the 
:ref:`built-in roles <atlas-user-privileges>` don't include your
desired set of privileges. |service| applies each database user's custom
roles together with:

- Any :ref:`built-in roles <atlas-user-privileges>` you
  assign when you :ref:`add a database user <add-mongodb-users>` or
  :ref:`modify a database user <modify-mongodb-users>`.
- Any :manual:`specific privileges </reference/privilege-actions/>` you
  assign when you :ref:`add a database user <add-mongodb-users>` or
  :ref:`modify a database user <modify-mongodb-users>`.

You can assign multiple custom roles to each database user.

.. note:: {+Free-Cluster+}, {+Flex-cluster+}, {+Shared-Cluster+}, and {+Serverless-Instance+} Limitation

   Changes to :doc:`custom roles </security-add-mongodb-roles>`
   might take up to 30 seconds to deploy in ``M0`` {+Free-clusters+}, {+Flex-clusters+},
   ``M2/M5`` {+Shared-clusters+} (deprecated), and {+Serverless-instances+} (deprecated).
   