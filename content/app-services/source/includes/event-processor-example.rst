.. code-block:: json

   "event_processors": {
      "AWS_EVENTBRIDGE": {
         "config": {
            "account_id": "012345678901",
            "region": "us-east-1"
         }
      }
   },
    "error_handler": {
      "config": {
         "enabled": true,
         "function_name": "myErrorHandler.js"
      }
   }