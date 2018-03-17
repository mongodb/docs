Before upgrading |onprem| from 3.4 to 3.6, complete the following 
actions:

- Upgrade all backing databases to MongoDB 3.2 or later.

- Upgrade the monitoring schema.

- Change :setting:`mms.minimumTLSVersion` if you must support
  older |tls| versions. 

  |application| supports |tls| 1.2 only by default. 

  To re-enable ciphers which have been disabled, change 
  :setting:`mms.disableCiphers`.

  .. warning:: 

     Consider the security implications carefully before doing this.
