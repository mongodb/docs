'Cannot Do Exclusion on Field <field> in Inclusion Projection'
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The driver returns an ``OperationFailure`` with this message if you attempt to
include and exclude fields in a single projection. Ensure that your
projection specifies only fields to include or fields to exclude.