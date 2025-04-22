.. _csfle-quick-start-create-master-key:
.. _fle-create-a-master-key:

You must create a {+cmk-long+} ({+cmk-abbr+}) to perform {+csfle-abbrev+}.

Create a 96-byte {+cmk-long+} and save it in your **Local Key Provider**,
which is your filesystem,
as the file ``master-key.txt``:

.. TODO: Requires External Review. Most likely Kenneth White
         Should we use OpenSSL, programming languages, or shell
         commands for different OSs?

.. code-block:: shell

   openssl rand 96 > master-key.txt

.. note:: Use a Programming Language to Create a {+cmk-long+}

   If you would rather use your preferred programming language to generate
   your {+cmk-abbr+}, you can view code snippets demonstrating how to generate a
   {+cmk-long+} in each of the supported languages of this
   guide on `GitHub <{+csfle-code-snippets-gen-keys+}>`__.

.. include:: /includes/csfle-warning-local-keys.rst
