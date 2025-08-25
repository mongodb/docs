.. note:: 404 Errors in Single-Page Apps
   
   When :doc:`single-page application hosting
   </hosting/host-a-single-page-application>` is enabled, App Services always
   returns an HTTP 200 response with the app root regardless of the
   requested route. This means that you cannot :doc:`specify a custom
   404 page </hosting/use-a-custom-404-page>` for a SPA. Instead, you
   should include custom code in your application to handle invalid
   routes.
