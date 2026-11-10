Starting in MongoDB 5.3, :ref:`SCRAM-SHA-1 <authentication-scram-sha-1>`
cannot be used for intra-cluster authentication. Only
:ref:`SCRAM-SHA-256 <authentication-scram-sha-256>` is supported.

In previous MongoDB versions, SCRAM-SHA-1 and SCRAM-SHA-256 can both be
used for intra-cluster authentication, even if SCRAM is not explicitly
enabled.
