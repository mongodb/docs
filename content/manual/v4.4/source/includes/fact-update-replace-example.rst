When replacing a document, the replacement document must consist of only
field/value pairs; i.e. do not include :manual:`update operators
</reference/operator/update>` expressions.

The replacement document can have different fields from the original
document. In the replacement document, you can omit the ``_id`` field
since the ``_id`` field is immutable; however, if you do include the
``_id`` field, it must have the same value as the current value.

The following example replaces the *first* document from the
``inventory`` collection where ``item: "paper"``: