.. note::

   All writes to the primary fail during the period starting when the
   |command-method-name| |command-method| is received until either a new
   primary is elected, or if there are no electible secondaries, the
   original primary resumes normal operation. The time period where
   writes fail is at maximum:

   ``secondaryCatchUpPeriodSecs`` (10s by default) +
   :rsconf:`~settings.electionTimeoutMillis` (10s by default).
