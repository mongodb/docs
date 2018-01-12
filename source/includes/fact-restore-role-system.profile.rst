If the backup data includes :data:`system.profile
<<database>.system.profile>` collection data and the target database
does not contain the :data:`system.profile <<database>.system.profile>`
collection, :binary:`~bin.mongorestore` attempts to create the collection
even though the program does not actually restore ``system.profile``
documents. As such, the user requires additional privileges to perform
:authaction:`createCollection` and :authaction:`convertToCapped`
actions on the :data:`system.profile <<database>.system.profile>`
collection for a database.
