On a sharded cluster, :ref:`DDL (Data Definition Language) operations 
<ddl-operations>` run with write concern :writeconcern:`"majority"`. If
you specify a different write concern, the operation overrides the
provided write concern with ``"majority"``.
