Ensure TTL Config is Valid
~~~~~~~~~~~~~~~~~~~~~~~~~~

Ensure that the :ref:`TTL <ttl-collections>` configuration is valid. 
Before upgrading, remove or correct any TTL indexes that have 
``expireAfterSeconds`` set to ``NaN``. In MongoDB 5.0 and later, 
setting ``expireAfterSeconds`` to ``NaN`` has the same effect as 
setting ``expireAfterSeconds`` to ``0``. For details, see 
:ref:`<ttl_expireAfterSeconds_behavior>`.
