If successful, :method:`createKey() <KeyVault.createKey()>` returns
the :abbr:`UUID (Universally unique identifier)` of the new data
encryption key. To retrieve the new data encryption key document from
the key vault, either:

- Use :method:`getKey() <KeyVault.getKey()>` to retrieve the created
  key by its :abbr:`UUID (Universally unique identifier)`, or
- Use :method:`getKeyByAltName() <KeyVault.getKeyByAltName()>`  to
  retrieve the key by its alternate name, if specified.