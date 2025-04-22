If the key imports successfully, the command returns:

.. code-block:: sh
   :copyable: false

   gpg: key 3132835C1D925D5B: public key "MongoDB CLI Tools Release Signing Key <packaging@mongodb.com>" imported
   gpg: Total number processed: 1
   gpg:               imported: 1

If you have previously imported the key, the command returns:

.. code-block:: sh
   :copyable: false

   gpg: key 3132835C1D925D5B: "MongoDB CLI Tools Release Signing Key <packaging@mongodb.com>" not changed
   gpg: Total number processed: 1
   gpg:              unchanged: 1
