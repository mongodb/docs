Disabling :readconcern:`"majority"` read concern prevents
:dbcommand:`collMod` commands which modify an index from
:ref:`rolling back <replica-set-rollbacks>`. If such an operation needs
to be rolled back, you must resync the affected nodes with the
:term:`primary` node.
