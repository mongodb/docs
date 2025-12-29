========================
AWS IAM Authentication
========================

.. default-domain:: mongodb

.. meta::
   :keywords: passwordless auth, passwordless, saml, federated identity management, iam roles
   :description: Set up AWS IAM authentication for database users to connect to Atlas clusters using IAM roles, reducing authentication mechanisms and secret management.


Use an |aws| |iam| User or Role :abbr:`ARN (Amazon Resource Name)` to authenticate a
database user. Using |aws| |iam| reduces the number of authentication mechanisms and
number of secrets to manage. |service| does not receive your authentication secret key
over the wire and the driver does not persist it.

.. note::

   |service| uses |aws| :abbr:`STS (Security Token Service)` to verify the
   identity of |iam| users and roles. |aws| enforces a `default request
   quota <https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_iam-quotas.html>`__
   of 600 requests per second, per account, per region. This quota is 
   applied against the |aws| account of the |iam| user or role. 
  
.. _passwordless-auth-aws-no-saml:

Set Up Authentication with AWS IAM Roles
----------------------------------------

You can set up |aws| |iam| Roles to authenticate |aws| compute types to your |service|
{+clusters+}.

.. note::

   You can't set up authentication for |aws| IAM principals when |ldap| authorization is
   enabled. 

   If you require authentication for an AWS IAM principal, consider moving the
   {+clusters+} that you want to access with |aws| IAM authentication into another project
   where |ldap| authorization is disabled.    

For |aws| Lambda and HTTP (ECS and EC2), drivers automatically read from the
:spec:`environment variables </auth/auth.rst#obtaining-credentials>`. For |aws| EKS, you
must manually assign the |iam| role. 

This page describes how |aws| Lambda, |aws| :abbr:`ECS (Elastic Container Service)`, and
|aws| :abbr:`EKS (Elastic Kubernetes Service)` can connect using an |aws| |iam| role.

.. note::

   You must assign an |iam| role to Lambda, EC2, ECS, or EKS in the 
   |aws| console.

.. tabs:: 

   .. tab:: AWS Lambda 
      :tabid: aws-lambda

      |aws| Lambda passes information to functions through the following 
      environment variables if you :aws:`assign an execution role
      </lambda/latest/dg/lambda-intro-execution-role.html>` to the
      lambda function. 

      - ``AWS_ACCESS_KEY_ID``
      - ``AWS_SECRET_ACCESS_KEY``
      - ``AWS_SESSION_TOKEN``

      .. note:: 

         You don't need to manually create these environment variables when
         you use an :aws:`execution role
         </lambda/latest/dg/lambda-intro-execution-role.html>` in your
         function.

      To learn more about these environment variables, see :aws:`Using AWS Lambda 
      environment variables </lambda/latest/dg/configuration-envvars.html>`.

   .. tab:: AWS ECS 
      :tabid: aws-ecs

      |aws| :abbr:`ECS (Elastic Container Service)` gets the credentials from 
      the following URI: 

      .. code-block:: shell 
         :copyable: false 

         http://169.254.170.2${AWS_CONTAINER_CREDENTIALS_RELATIVE_URI}

      ``AWS_CONTAINER_CREDENTIALS_RELATIVE_URI`` is an environment variable. 
      To learn more, see :aws:`IAM Roles for Tasks
      </AmazonECS/latest/developerguide/task-iam-roles.html>` in the AWS documentation. 

      |aws| EC2 gets the credentials from Instance Metadata Service V2 at the 
      following |url|: 

      .. code-block:: shell 
         :copyable: false

         http://169.254.169.254/latest/meta-data/iam/security-credentials/

      To learn more, see :aws:`Launch an instance with an IAM role
      </AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html#attach-iam-role>` in the AWS
      documentation. 

   .. tab:: AWS ECS Fargate
      :tabid: aws-ecs-fargate

      To learn how to configure an AWS IAM role for authentication with 
      |aws| ECS Fargate, see the :aws:`Amazon ECS task execution IAM role 
      </AmazonECS/latest/developerguide/task_execution_IAM_role.html>` in the AWS documentation.

   .. tab:: AWS EKS 
      :tabid: aws eks

      For |aws| :abbr:`EKS (Elastic Kubernetes Service)`, you must first
      assign the |iam| role to your pod to set up the following environment 
      variables in that pod:

      - ``AWS_WEB_IDENTITY_TOKEN_FILE`` - contains the path to the web 
        identity token file.
      - ``AWS_ROLE_ARN`` - contains the |iam| role used to connect to
        your {+database-deployment+}. 

      To learn more about AWS EKS, see :aws:`What is Amazon EKS?
      </eks/latest/userguide/what-is-eks.html>` in the AWS documentation.

Grant Database Access to AWS IAM Roles 
--------------------------------------

To grant database access to the |aws| |iam| role, complete the steps
described in the :ref:`mongodb-users` section for |aws| |iam|. For
more information on granting database access using {+atlas-cli+},
{+atlas-admin-api+}, or {+atlas-ui+}, see :ref:`Configure Database Users <add-mongodb-users>`. 

Connect to |service| {+Cluster+} Using AWS IAM
----------------------------------------------

To connect to |service| with your |aws| |iam| credentials using
{+mongosh+}, provide :ref:`a connection string that specifies the
MONGODB-AWS authentication mechanism
<find-connection-string>`. This connection string
format applies to all AWS IAM authentication mechanisms. 

.. important::

   You must configure authentication using one of the
   methods described in :ref:`passwordless-auth-aws-no-saml` before
   you can use this connection string format.

.. include:: /includes/aws-iam-connection-string-example.rst

.. seealso:: 

   :aws:`IAM roles for service accounts </eks/latest/userguide/iam-roles-for-service-accounts.html>`
