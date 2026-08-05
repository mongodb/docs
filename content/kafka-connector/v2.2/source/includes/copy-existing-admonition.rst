If any system changes the data in the database while the source connector
converts existing data from it, MongoDB may produce duplicate change
stream events to reflect the latest changes.  Since the change stream
events on which the data copy relies are idempotent, the copied data is
eventually consistent, conformant to an "at-least-once" delivery guarantee.

