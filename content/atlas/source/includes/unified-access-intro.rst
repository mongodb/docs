Some |service| features, including :ref:`Data Federation 
<atlas-data-federation>` and :ref:`Encryption at Rest 
<security-aws-kms>`, authenticate with |aws| `IAM roles 
<https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use.html>`__. 
When |service| accesses |aws| services, 
`assumes an IAM role
<https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_manage-assume.html>`__.

You can set up an assumed IAM role for your |service| account to use 
with the {+atlas-admin-api+} or {+atlas-ui+} if you have the
:authrole:`Project Owner` role. |service| supports unified access only
for |aws|.
