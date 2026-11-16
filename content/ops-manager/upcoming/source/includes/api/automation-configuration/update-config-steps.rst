To update the configuration:

1. Retrieve the current configuration. 

   You can use the :ref:`/groups/{PROJECT-ID}/automationConfig
   <get-auto-config>` endpoint to get the full configuration, or use the
   :ref:`/groups/{PROJECT-ID}/automationConfig/noSecrets
   <get-auto-config-no-secrets>` endpoint to get the configuration with
   sensitive information redacted, such as passwords or key values.

   Note the value of the ``version`` field in the response body.
#. Make changes to a copy of the current configuration, changing only
   those items you want modified.

   Keep the ``version`` field set to the value that you noted in the
   previous step.
#. Submit your new configuration using ``PUT``, with the updated
   configuration in the request body. You must use ``PUT``. **Do not**
   use ``PATCH``.

   Starting in Ops Manager 8.0.28 and 9.0.2, if another user or
   process published a change after you retrieved the configuration,
   |mms| rejects the request with a ``409``
   ``AUTOMATION_CONFIG_CONCURRENT_MODIFICATION`` error. Retrieve the
   configuration again, reapply your changes, and resubmit the
   request.

   When you submit updates, |mms| makes internal modifications to the
   data and then saves your new configuration version.