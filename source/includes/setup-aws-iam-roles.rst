Begin the Setup Procedure for AWS IAM Access
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. Expand the :guilabel:`Options` menu next to your project name
   in the {+atlas-ui+} upper left corner. Select 
   :guilabel:`Integrations`.
#. Click the :guilabel:`Configure` button in the :guilabel:`AWS 
   IAM Role Access` panel.

   Note: if you already have one or more roles configured, the 
   button reads :guilabel:`Edit`.
#. Click the :guilabel:`Authorize an AWS IAM Role` button.
#. Read through the :guilabel:`Overview` instructions, then click
   :guilabel:`Next`.
#. If you'd like to create a new AWS IAM role for use with 
   |service|, use the :guilabel:`Create New Role with the AWS 
   CLI` procedure. If you have an existing AWS IAM role you want 
   to authorize for |service|, use the :guilabel:`Add Trust 
   Relationships to an Existing Role` procedure.

.. _create-new-role-aws-cli:

Create New Role with the AWS CLI
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. Click :guilabel:`Create New Role with the AWS CLI` to expand 
   the next section.
#. Copy the JSON text and save it to a file named 
   ``role-trust-policy.json``.
#. Enter a name for your new AWS IAM role in the text box.
#. If you don't already have the AWS Command Line Interface (CLI)
   installed, see the `documentation
   <https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html>`__.
   If you do have the AWS CLI installed, proceed to the next step.
#. Copy the CLI command and enter it at the command prompt.
#. If successful, the CLI command returns a JSON document with 
   information about the newly created AWS IAM role. Locate the 
   field named :guilabel:`Arn` and copy it into the text box 
   labelled :guilabel:`Enter the Role ARN` in the |service| modal 
   window.
#. Click :guilabel:`Validate and Finish`.