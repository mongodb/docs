``AutoReconnect`` Error
-----------------------

You receive this error if you specify ``tag-sets`` in your
read preference and MongoDB is unable to find replica set members with the specified
tags. To avoid this error, include an empty dictionary (``{}``) at the end of
the tag-set list. This instructs {+driver-short+} to read from any member that
matches the read-reference mode when it can't find matching tags.