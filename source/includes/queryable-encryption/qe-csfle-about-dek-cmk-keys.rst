In-use encryption uses a multi-level key hierarchy to protect your data,
often called ":term:`envelope encryption`" or "wrapping keys".

A {+cmk-long+} ({+cmk-abbr+}), sometimes called a
{+kms-long+} ({+kms-abbr+}) key, is the top-level key you create in your
customer provisioned key provider, such as a cloud KMS. The {+cmk-abbr+}
encrypts {+dek-long+}s ({+dek-abbr+}), which in turn encrypt the fields
in your documents. Without access to a {+cmk-abbr+}, your client 
application cannot decrypt the associated DEKs.

MongoDB stores DEKs, encrypted with your {+cmk-abbr+}, in the
{+key-vault-long+} as BSON documents. MongoDB can never decrypt the DEKs, as key management is
client-side and customer controlled.

If you delete a {+dek-abbr+}, all fields encrypted with that
{+dek-abbr+} become permanently unreadable. If you delete a {+cmk-abbr+}, all fields encrypted with a {+dek-abbr+}
using that {+cmk-abbr+} become permanently unreadable.

.. warning::

   The {+cmk-long+} is the most sensitive key in {+qe+}. If your
   {+cmk-abbr+} is compromised, all of your encrypted data can be
   decrypted. Use a remote {+kms-long+} to store your {+cmk-abbr+}.