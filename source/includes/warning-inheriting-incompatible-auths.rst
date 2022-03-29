.. warning::

           If a user inherits multiple roles with incompatible authentications 
           restrictions, that user becomes unusable. For example, if a user
           inherits one role in which the ``clientSource`` field is ``[198.51.100.0]``
           and another role in which the ``clientSource`` field is ``[203.0.113.0]``,
           the server is unable to authenticate the user.

           For more information about authentication in MongoDB, see
           `Authentication <https://www.mongodb.com/docs/manual/core/authentication/>`_.