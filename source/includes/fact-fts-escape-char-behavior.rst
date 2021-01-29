When using the escape character in the |mongo| shell, you must use a
double backslash before the character to be escaped.

.. example::

   To create a wildcard expression which searches for any string
   containing a literal asterisk in an aggregation pipeline which runs
   in the |mongo| shell, use the following expression:

   .. code-block:: none

      "*\\**"

   The first and last asterisks act as wildcards which match any
   characters, and the ``\\*`` matches a literal asterisk.

When using the escape character with a :driver:`driver </>`, use a
single backslash before the character to be escaped.

.. example::

   To create a wildcard expression which searches for any string
   containing a literal asterisk in an aggregation pipeline which runs
   in a driver, use the following expression:

   .. code-block:: none

      "*\**"

   The first and last asterisks act as wildcards which match any
   characters, and the ``\*`` matches a literal asterisk.
   