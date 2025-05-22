You rotate your {+cmk-abbr+} either manually or automatically on your
provisioned key provider. MongoDB has no visibility into this process.
Once you rotate the {+cmk-abbr+}, MongoDB uses it to wrap all new DEKs.
It does not re-wrap existing encrypted DEKs. These are still wrapped 
with the prior {+cmk-abbr+}.

To rotate some or all of the encrypted DEKs in your key vault, use
the :method:`KeyVault.rewrapManyDataKey()` method. It seamlessly
re-wraps keys with the new {+cmk-abbr+} specified, without interrupting
your application. The DEKs themselves are left unchanged after 
re-wrapping them with the new {+cmk-abbr+}.