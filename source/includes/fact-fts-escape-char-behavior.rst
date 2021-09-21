When using the escape character in {+mongosh+}, you must use a
double backslash before the character to be escaped.

.. example::

   To create a wildcard expression which searches for any string
   containing a literal asterisk in an aggregation pipeline which runs
   in {+mongosh+}, use the following expression:

   .. code-block:: none

      "*\\**"

   The first and last asterisks act as wildcards which match any
   characters, and the ``\\*`` matches a literal asterisk.

   .. note:: 
   
      Use the following expression to escape a literal backslash:
      
      .. code-block:: none 

         "*\\\*"

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
   