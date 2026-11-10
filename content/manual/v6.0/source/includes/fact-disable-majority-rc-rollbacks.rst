If you disable :readconcern:`"majority"` read concern, MongoDB prevents
:dbcommand:`collMod` commands which modify an index from :ref:`rolling back
<replica-set-rollbacks>`. If you need to roll back ``collMod`` commands, you
must resync the affected nodes with the :term:`primary` node.
