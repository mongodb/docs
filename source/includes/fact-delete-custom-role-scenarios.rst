You cannot delete a custom MongoDB role in the following scenarios:

- When deleting the role would leave one or more child roles with no
  parent roles or actions.

- When deleting the role would leave one or more
  :ref:`MongoDB users <mongodb-users>` with no roles.
