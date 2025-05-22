.. _qe-manual-enc-create-master-key:

You must create a {+cmk-long+} ({+cmk-abbr+}) to perform {+qe+}.

Create a 96-byte {+cmk-long+} and save it to the
file ``master-key.txt``:

.. code-block:: shell

   openssl rand 96 > master-key.txt

.. note:: Use a Programming Language to Create a {+cmk-long+}

   If you would rather use your preferred programming language to generate
   your {+cmk-abbr+}, you can view code snippets demonstrating how to generate a
   {+cmk-long+} in each of the supported languages of this
   guide on `GitHub <{+csfle-code-snippets-gen-keys+}>`__.

.. include:: /includes/queryable-encryption/qe-warning-local-keys.rst
