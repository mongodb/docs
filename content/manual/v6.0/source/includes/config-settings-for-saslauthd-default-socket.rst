Or if using a :doc:`YAML format configuration file
</reference/configuration-options>`, specify the following settings in
the file:

.. code-block:: yaml

   security:
      authorization: enabled

   setParameter:
      saslauthdPath: ""
      authenticationMechanisms: PLAIN

Or, if using the :v2.4:`older configuration file format
</reference/configuration-options>`:

.. code-block:: ini

   auth=true
   setParameter=saslauthdPath=""
   setParameter=authenticationMechanisms=PLAIN
