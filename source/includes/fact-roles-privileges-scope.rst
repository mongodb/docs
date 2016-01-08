Except for roles created in the ``admin`` database, a role can only
include privileges that apply to its database and can only inherit from
other roles in its database.

A role created in the ``admin`` database can include privileges that
apply to the ``admin`` database, other databases or to the
:ref:`cluster <resource-cluster>` resource, and can inherit from roles
in other databases as well as the ``admin`` database.
