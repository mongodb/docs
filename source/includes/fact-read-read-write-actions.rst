When applied to a collection, the ``read`` and ``readWrite`` roles in
|service| differ slightly from the
:manual:`built-in </reference/built-in-roles/>` MongoDB ``read`` and
``readWrite`` roles.

In |service|, ``read`` provides the following collection-level
:manual:`actions </reference/privilege-actions/>`:

- :manual:`collStats </reference/privilege-actions/#collStats/>`

- :manual:`dbHash </reference/privilege-actions/#dbHash>`

- :manual:`find </reference/privilege-actions/#find/>`

- :manual:`listIndexes </reference/privilege-actions/#listIndexes>`

In |service|, ``readWrite`` provides the same actions
as ``read``, as well as the following
additional collection-level
:manual:`actions </reference/privilege-actions/>`:

- :manual:`convertToCapped
  </reference/privilege-actions/#convertToCapped>`

- :manual:`createCollection
  </reference/privilege-actions/#createCollection>`

- :manual:`createIndex
  </reference/privilege-actions/#createIndex>`

- :manual:`dropCollection
  </reference/privilege-actions/#dropCollection>`

- :manual:`dropIndex
  </reference/privilege-actions/#dropIndex>`

- :manual:`insert <reference/privilege-actions/#insert>`

- :manual:`remove </reference/privilege-actions/#remove>`

- :manual:`update </reference/privilege-actions/#update>`
