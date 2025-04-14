
a. Navigate to the `AWS IAM Console <https://aws.amazon.com/iam/>`__.     

#. Create an IAM User

   .. _csfle-tutorial-aws-create-iam-user:

   Create a new programmatic {+aws-iam-abbr+}
   user in the AWS management console by
   following the official AWS documentation on
   `Adding a User <https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html>`__.
   You will use this {+aws-iam-abbr+} user as a service account for your CSFLE-enabled application.
   Your application authenticates with AWS KMS using the {+aws-iam-abbr+}
   user to encrypt and decrypt your {+dek-long+}s (DEKs) with your {+cmk-long+}
   (CMK).

   .. important:: Record your Credentials

      Ensure you record the following {+aws-iam-abbr+} credentials in the final
      step of creating your {+aws-iam-abbr+} user:

      - **access key ID**
      - **secret access key**

      You have one opportunity to record these credentials. If you do
      not record these credentials during this step, you must create
      another {+aws-iam-abbr+} user.

#. Grant Permissions

   Grant your {+aws-iam-abbr+} user ``kms:Encrypt`` and ``kms:Decrypt`` permissions for
   your remote master key.

   .. important::

      The new client {+aws-iam-abbr+} user *should not* have administrative permissions
      for the master key. To keep your data secure, follow the
      `principle of least privilege <https://en.wikipedia.org/w/index.php?title=Principle_of_least_privilege&oldid=1080333157>`__.

   The following inline policy allows an {+aws-iam-abbr+} user to encrypt and decrypt
   with the {+cmk-long+} with the least privileges possible:

   .. note:: Remote Master Key ARN

      The following policy requires the {+aws-arn-abbr+} of the key you generate in the
      :ref:`Create the Master Key <aws-create-master-key>` step of this guide.

   .. literalinclude:: /includes/tutorials/automatic/aws/iam-user-policy-minimum.json
      :language: json

   To apply the preceding policy to your {+aws-iam-abbr+} user, follow the
   `Adding IAM identity permissions <https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_manage-attach-detach.html#add-policies-console>`__
   guide in the AWS documentation.

   .. important:: Authenticate with IAM Roles in Production

         When deploying your CSFLE-enabled application to a production environment,
         authenticate your application by using an {+aws-iam-abbr+} role
         instead of an {+aws-iam-abbr+} user.

         To learn more about {+aws-iam-abbr+} roles, see the following
         pages in the official AWS documentation:

         - `IAM roles <https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html>`__
         - `When to create an IAM role (instead of a user) <https://docs.aws.amazon.com/IAM/latest/UserGuide/id.html#id_which-to-choose_role>`__
