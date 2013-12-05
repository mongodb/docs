A user-defined role scoped for a non-``admin`` database can **only**
contain privileges that :doc:`act </reference/privilege-actions>` on
the role's :doc:`database </reference/resource-document>`; its
privilege can act on individual collections in that database or
multiple collections in that database. User-defined roles scoped for
the ``admin`` database can contain privileges that act on other
databases and the :ref:`cluster resource <resource-cluster>` as well as
on the ``admin`` database.

.. inherit-role

A user-defined role scoped for a non-``admin`` database can **only**
inherit from other roles that exists in its database. User-defined
roles scoped for the ``admin`` database can inherit from roles in other
databases as well as in the ``admin`` database.
