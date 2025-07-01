|service| limits |service| user membership to 500 |service| users per 
project and 500 |service| users per organization, which includes the
combined membership of all projects in the organization.

|service| raises an error if an operation exceeds these limits.

.. example::

   You have an organization with five projects. Each project has 100
   |service| users. Each |service| user belongs to only one project.
   You cannot add any |service| users to this organization without
   first removing existing |service| users from the organization
   membership.
