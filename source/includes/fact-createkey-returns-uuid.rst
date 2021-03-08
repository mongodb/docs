If successful, :method:`~KeyVault.createKey()` returns the
:abbr:`UUID (Universally unique identifier)` of the new data encryption
key. The ``UUID`` is a BSON :bsontype:`Binary (BinData) <Binary>` object
with subtype ``4`` that uniquely identifies the data encryption key.
The ``UUID`` string is the hexadecimal representation of the
underlying binary data.

If you are providing the data encryption key to an official 4.2+
compatible driver in order to configure
:ref:`automatic client-side field level encryption
<field-level-encryption-json-schema>`, you must use the ``base64``
representation of the ``UUID`` string.

You can run the following operation in the :binary:`~bin.mongo`
shell to convert a ``UUID`` hexadecimal string to its ``base64``
representation:

.. code-block:: javascript

   UUID("b4b41b33-5c97-412e-a02b-743498346079").base64()

Supply the ``UUID`` of your own data encryption key to this command, as
returned from :method:`~KeyVault.createKey()` above, or as described in
:ref:`field-level-encryption-data-key-retrieve`.
