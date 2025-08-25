.. important:: Third Party Services & Push Notifications Deprecation

   Third party services and push notifications in App Services have been deprecated
   in favor of creating HTTP endpoints that use :ref:`external dependencies
   <external-dependencies>` in functions.

   Webhooks have been renamed to :ref:`HTTPS Endpoints
   <https-endpoints>` with no change in behavior. You should
   :ref:`migrate <convert-webhooks-to-endpoints>` existing Webhooks.

   Existing services will continue to work until **September 30, 2025**.

   Because third party services and push notifications are now deprecated, they have
   been removed by default from the App Services UI. If you need to manage an existing third party
   service or push notification, you can add the configurations back to the UI by doing
   the following:

   - In the left navigation, under the :guilabel:`Manage` section, click 
     :guilabel:`App Settings`.

   - Enable the toggle switch next to 
     :guilabel:`Temporarily Re-Enable 3rd Party Services`, and then save your 
     changes.
