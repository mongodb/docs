Installation
------------

Why doesn't the monitoring server startup successfully?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Confirm the URI or IP address for the |mms| service is stored
correctly in this property in the
``<install_dir>/conf/conf-mms.properties`` file:

.. code-block:: ini

   mongo.mongoUri=<SetToValidUri>

If you don't set this property, |mms| will fail while trying to connect
to the default 127.0.0.1:27017 URL.

If the URI or IP address of your service changes, you must update the
property with the new address. For example, update the address if you
deploy on a system without a static IP address, or if you deploy on EC2
without a fixed IP and then restart the EC2 instance.

If the URI or IP address changes, then each user who access the service
must also update the address in the URL used to connect and in the
client-side ``monitoring-agent.config`` files.

If you use the |mms| :program:`<install_dir>/bin/credentialstool` to encrypt
the password used in the ``mongo.mongoUri`` value, also add the
``mongo.encryptedCredentials`` key to the
``<install_dir>/conf/conf-mms.properties`` file and set the value for this
property to true:

.. code-block:: ini

   mongo.encryptedCredentials=true

For more details, see :ref:`on-prem-authentication-configuration`.
