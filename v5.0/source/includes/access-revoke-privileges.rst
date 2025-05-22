You must have the :authaction:`revokeRole` :ref:`action
<security-user-actions>` on the database a privilege targets in order to
revoke that privilege. If the privilege targets multiple databases or the
``cluster`` resource, you must have the :authaction:`revokeRole` action
on the ``admin`` database.
