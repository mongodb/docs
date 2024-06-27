If the key imports successfully, the command returns:

.. code-block:: sh
    :copyable: false

    gpg: key CEED0419D361CB16: public key "Mongosh Release Signing Key <packaging@mongodb.com>" imported
    gpg: Total number processed: 1
    gpg:               imported: 1

If you have previously imported the key, the command returns:

.. code-block:: sh
    :copyable: false

    gpg: key A8130EC3F9F5F923: "Mongosh Release Signing Key <packaging@mongodb.com>" not changed
    gpg: Total number processed: 1
    gpg:              unchanged: 1
