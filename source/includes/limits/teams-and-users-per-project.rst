|service| limits the number of teams to a maximum of:

- 100 teams per project and
- 250 teams per organization.

|service| also limits |service| user membership to a maximum of:

- 500 per project and
- 500 per organization, which includes the combined membership of all
  projects in the organization.

|service| raises an error if an operation exceeds these limits.

.. example::

   You have an organization with five projects. Each project has 100
   |service| users. Each |service| user belongs to only one project.
   You cannot add any |service| users to this organization or any
   project in that organization without first removing existing
   |service| users from the organization or project membership.
