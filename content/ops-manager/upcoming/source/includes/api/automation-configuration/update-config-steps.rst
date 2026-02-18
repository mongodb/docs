To update the configuration:

1. Retrieve the current configuration. 

   You can use the :ref:`/groups/{PROJECT-ID}/automationConfig
   <get-auto-config>` endpoint to get the full configuration, or use the
   :ref:`/groups/{PROJECT-ID}/automationConfig/noSecrets
   <get-auto-config-no-secrets>` endpoint to get the configuration with
   sensitive information redacted, such as passwords or key values.
#. Make changes to a copy of the current configuration, changing only
   those items you want modified.
#. Replace the entire configuration using ``PUT``, with the updated
   configuration in the request body. You must use ``PUT``. **Do not**
   use ``PATCH``.

   When you submit updates, |mms| makes internal modifications to the
   data and then saves your new configuration version.