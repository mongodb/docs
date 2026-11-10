.. note::

   For Databricks Unity, {+atlas-sp+} stores the OAuth secret in the
   Connection Registry. The OAuth secret expires after two years at
   most, based on the expiration date that you set when you generate
   it. Rotate your client secret before it expires to avoid
   interrupting your stream processors. Snowflake Horizon key-pair
   authentication doesn't have this expiration.
