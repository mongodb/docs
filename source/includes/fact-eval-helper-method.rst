The shell helper :method:`db.eval()` acts as a wrapper around the
:dbcommand:`eval` command. As such, the helper method shares the
characteristics and behavior of the underlying command itself with the
*one exception* in that the :method:`db.eval()` method does not support
the ``nolock`` option.
