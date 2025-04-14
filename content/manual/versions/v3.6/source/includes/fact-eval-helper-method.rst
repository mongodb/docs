The helper :method:`db.eval()` in the :binary:`~bin.mongo` shell wraps the
:dbcommand:`eval` command. Therefore, the helper method shares the
characteristics and behavior of the underlying command with *one
exception*: :method:`db.eval()` method does not support the ``nolock``
option.
