.. eval-command-nolock

By default, :dbcommand:`eval` takes a global write lock before
evaluating the JavaScript function. This means that :dbcommand:`eval`
blocks all other read and write operations to the database while the
:dbcommand:`eval` operation runs. Set ``nolock`` to ``true`` to ensure
that :dbcommand:`eval` does not take this global write lock before
evaluating the function. The flag does not impact whether the
JavaScript code itself takes a write lock.

.. eval-method-lock

The :method:`db.eval()` method takes a global write lock by default
before executing the JavaScript function. This means that
:method:`db.eval()` blocks all other read and write operations to the
database while the :method:`db.eval()` operation runs. You can,
however, use the :dbcommand:`eval` command, instead of the
:method:`db.eval()` method, with the ``nolock`` flag to ``true``. See
:dbcommand:`eval` command for more details.
