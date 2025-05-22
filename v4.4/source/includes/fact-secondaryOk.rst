.. include:: /includes/fact-setSecondaryOk.rst

Also means that :term:`eventually consistent <eventual consistency>`
read operations are acceptable for the current application. See
:method:`readPref() <cursor.readPref()>` for additional
fine-grained settings for the :doc:`read preference
</core/read-preference>`.