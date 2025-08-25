A :manual:`$project </reference/operator/aggregation/project>`
expression that selects a subset of fields from each event in the change
stream. You can use this to :ref:`optimize the trigger's execution
<database-triggers-project-expression>`.

The expression is an object that maps the name of fields in the change
event to either a ``0``, which excludes the field, or a ``1``, which
includes it. An expression can have values of either ``0`` or ``1`` but
not both together. This splits projections into two categories,
inclusive and exclusive:

- An *inclusive* project expression specifies fields to include in each
  change event document. The expression is an object that maps the name
  of fields to include to a ``1``. If you don't include a field, it is
  not included in the projected change event.

  .. example::
     
     The following projection includes only the ``_id`` and
     ``fullDocument`` fields:
     
     .. code-block:: javascript
        
        {
          _id: 1,
          fullDocument: 1
        }

- An *exclusive* project expression specifies fields to exclude from
  each change event document. The expression is an object that maps the
  name of fields to include to a ``0``. If you don't exclude a field, it
  is included in the projected change event.

  .. example::
  
     The following projection excludes the ``_id`` and
     ``fullDocument`` fields:

     .. code-block:: javascript
   
        {
          _id: 0,
          fullDocument: 0
        }
  
  .. note::

     You cannot exclude the ``operation_type`` field with a projection.
     This ensures that the trigger can always check if it should run for
     a given event's operation type.
