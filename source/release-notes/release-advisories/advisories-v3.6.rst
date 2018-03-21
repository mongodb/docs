Before upgrading |onprem| from 3.4 to 3.6, complete the following 
actions:

- Upgrade all backing databases to MongoDB 3.2 or later.

- Upgrade the monitoring schema.

  To monitor the schema upgrade:

  a. Click :guilabel:`Admin`.
  b. Click :guilabel:`Ops Manager Config`.
  c. Click the :guilabel:`Miscellaneous` tab.

     The progress should be shown before the 
     :guilabel:`Default Monitoring Data Retention` heading.

- Change :setting:`mms.minimumTLSVersion` if you must support
  older |tls| versions. 

  |application| supports |tls| 1.2 only by default. 

  To re-enable ciphers which have been disabled, change 
  :setting:`mms.disableCiphers`.

  .. warning:: 

     Consider the security implications carefully before doing this.
