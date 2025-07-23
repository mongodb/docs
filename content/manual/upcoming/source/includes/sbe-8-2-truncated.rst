Starting in MongoDB 8.2, if the |slotBasedPlan| field is too large, the
field or its subfields may be truncated or omitted entirely. When
truncation occurs, the explain output includes a warning stating that
the ``slotBasedPlan`` exceeded the BSON size limit.
