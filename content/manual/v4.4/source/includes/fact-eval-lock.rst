By default, |object| takes a global write lock while evaluating the
JavaScript function. As a result, |object| blocks all other read and
write operations to the database while the |object| operation runs. 

To prevent the taking of the global write lock while evaluating the
JavaScript code, use the |nolockobject| with ``nolock`` set to
``true``. ``nolock`` does not impact whether the operations within the
JavaScript code take write locks.
