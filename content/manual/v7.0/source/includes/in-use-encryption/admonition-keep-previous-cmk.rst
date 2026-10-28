.. warning::

   As you rotate keys, confirm that they aren't used to encrypt any
   other keys or data before deleting them. Keep your previous
   {+cmk-abbr+} enabled on your {+kms-abbr+} until you rewrap every
   {+dek-abbr+} that uses it. If you delete a {+dek-abbr+}, all fields
   encrypted with that {+dek-abbr+} become permanently unreadable. If
   you delete a {+cmk-abbr+}, all fields encrypted with a {+dek-abbr+}
   using that {+cmk-abbr+} become permanently unreadable.
