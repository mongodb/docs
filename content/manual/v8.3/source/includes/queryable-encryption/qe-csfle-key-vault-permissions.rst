Applications with :authrole:`read` access to the {+key-vault-long+} can
retrieve encrypted {+dek-long+} ({+dek-abbr+})s by querying the
collection. However, only applications with access to the {+cmk-long+}
({+cmk-abbr+}) used to encrypt a {+dek-abbr+} can use that {+dek-abbr+}
for encryption or decryption. You must grant your application access to
both the {+key-vault-long+}  and your {+cmk-abbr+} to encrypt and 
decrypt documents with a {+dek-abbr+}.

To learn how to grant access to a MongoDB collection, see
:manual:`Manage Users and Roles </tutorial/manage-users-and-roles/>`
in the MongoDB manual.