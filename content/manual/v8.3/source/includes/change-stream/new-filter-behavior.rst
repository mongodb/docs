Starting in MongoDB 6.0, whenever possible, :ref:`match filters
<change-stream-modify-output>` are applied to change streams earlier
than in prior releases. This improves performance. However, when a
filter is narrowly defined, an earlier match may cause an operation that
succeeds in prior versions to fail in 6.0.

