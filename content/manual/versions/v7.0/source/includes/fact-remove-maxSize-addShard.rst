Starting in version 6.2, MongoDB removes the ``maxSize`` field 
from the :dbcommand:`addShard` command. As a result:

- Running :dbcommand:`addShard` with the ``maxSize`` field returns 
  an ``InvalidOptions`` error.

- New documents in the :data:`~config.shards` collection no longer 
  include the ``maxSize`` field.

- Any pre-existing ``maxSize`` field entries are ignored.