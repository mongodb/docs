Configuration Setting Changes
  |mms| may replace any changes you made to your configuration file on upgrade, depending on Linux distribution and local configurations.

  When upgrading, you may want to update the :setting:`mongo.mongoUri`
  value to include the new parameters introduced with the `MongoDB Java
  driver
  <https://mongodb.github.io/mongo-java-driver/3.11/upgrading/>`__. By
  default, this driver enables retryable reads and retryable writes. If
  you set custom logic to retry reads and writes, the attempts now may
  take too long. To disable these default values, add the following to
  your connection string:

  .. example::

     mongodb://SERVER:PORT/?maxPoolSize=150&retryWrites=false&retryReads=false
