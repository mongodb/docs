If you are using a three-member primary-secondary-arbiter (PSA)
architecture, the write concern :writeconcern:`"majority"` can cause
performance issues if a secondary is unavailable or lagging. See
:ref:`performance-issues-psa` for advice on how to mitigate these
issues.
