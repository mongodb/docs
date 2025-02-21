.. note::

   Starting with the :ref:`atlas_20210126`, you must use |aws| |iam| 
   *roles* instead of |iam| *users* to manage access to your 
   |aws| |kms| encryption keys for customer key management.

   When you move from |aws| |iam| users to roles, ensure that your new role 
   has access to your old |aws| customer master key.
