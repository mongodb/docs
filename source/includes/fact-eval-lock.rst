By default, |object| takes a global write lock before evaluating the
JavaScript function. As a result, |object| blocks all other read and
write operations to the database while the |object| operation runs. Set
``nolock`` to ``true`` on the |nolockobject| to prevent the
|nolockobject| from taking the global write lock before evaluating the
JavaScript. ``nolock`` does not impact whether operations within the
JavaScript code itself takes a write lock.
