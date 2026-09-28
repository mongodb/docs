.. note::

    If the response containing all conflicting document ``_id`` values
    exceeds 8MB, MongoDB returns the following error message instead of
    listing the specific violations:

    .. code-block:: none

        Cannot convert the index to unique. Too many conflicting documents
        were detected. Please resolve them and rerun collMod.

    In this case, resolve duplicate entries until the response
    is under 8MB, then run ``collMod`` again to see the remaining
    violations.
