Connecting to |service| using AWS IAM authentication with the
{+mongosh+} requires shell version v0.9.0 or higher. 

Consider the following: 

- Use your `AWS IAM credentials
  <https://console.aws.amazon.com/iam/home?region=us-west-2#/security_credentials>`__,
  using your access key ID as your username and your secret key as your
  password. 

- The ``authSource`` query parameter is ``$external``, URL-encoded as
  ``%24external``. 

- The ``authMechanism`` query parameter is ``MONGODB-AWS``.

  .. example::

     .. code-block:: sh

        mongosh "mongodb+srv://<atlas-host-name>/test?authSource=%24external&authMechanism=MONGODB-AWS" --username <access-key-id> --password <secret-key>