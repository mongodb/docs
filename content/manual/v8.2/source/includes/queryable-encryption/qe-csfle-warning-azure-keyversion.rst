.. warning::

    If you do not include a ``keyVersion`` field, {+azure-kv+} attempts
    to decrypt {+dek-long+}s using the latest {+cmk-long+}. If you
    rotate the {+cmk-abbr+} but do not :ref:`rewrap the
    {+dek-long+}s <qe-fundamentals-manage-keys>` with the new
    master key, attempting to decrypt an existing {+dek-abbr+}
    fails, since the {+dek-abbr+} is encrypted with the previous
    version of the {+cmk-abbr+}.