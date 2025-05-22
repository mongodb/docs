Your {+dek-long+} ({+dek-abbr+}) is the key MongoDB uses to encrypt the fields in your
documents. You store your {+dek-abbr+} in a document in the
{+key-vault-long+}, encrypted with your {+cmk-long+} ({+cmk-abbr+}).

Your {+cmk-long+} is the key MongoDB uses to encrypt your {+dek-long+}s during creation. Without access to a {+cmk-abbr+}, your
client application cannot decrypt the associated DEKs.

If you delete a {+dek-abbr+}, all fields encrypted with that
{+dek-abbr+} become permanently unreadable. If you delete a {+cmk-abbr+}, all fields encrypted with a {+dek-abbr+}
using that {+cmk-abbr+} become permanently unreadable.

.. warning::

   The {+cmk-long+} is the most sensitive key in {+qe+}. If your
   {+cmk-abbr+} is compromised, all of your encrypted data can be
   decrypted. Use a remote {+kms-long+} to store your {+cmk-abbr+}.