.. _java_write_error:

This section describes write exceptions you might encounter when
using the {+driver-long+} to perform MongoDB write operations. Once you
understand the types of write exceptions that the driver raises, you can take
appropriate actions to either handle them or correct the error-causing code.

.. note::

   This page addresses only write exception handling. If you encounter
   any other issues with MongoDB or the driver, visit the following
   resources:
 
    - :ref:`java-connection-troubleshooting` for potential solutions to issues
      you might encounter when connecting to a MongoDB deployment
    - :ref:`java-issues-and-help` page for information about reporting bugs,
      contributing to the driver, and finding more resources
    - :community-forum:`MongoDB Community Forums </tag/java>` for questions,
      discussions, or general technical support

Write Error
~~~~~~~~~~~

If the driver encounters an error while performing a write operation, it
creates an error of the `WriteError <{+core-api+}/WriteError.html>`__ type.

The ``WriteError`` type contains the following fields: 

    - ``code``: the code associated with the error
    - ``message``: a message explaining the error
    - ``details``: an optional field containing details associated with the error