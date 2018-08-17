.. important::

   Although |compass| supports connecting to a MongoDB instance through
   an SSH tunnel via TLS/SSL, this configuration may lead to
   unexpected behavior when connecting to a member of a replica set.
   Using this configuration,  if the member to which you
   are connected switches from a
   :manual:`primary </core/replica-set-primary/>` member to a
   :manual:`secondary </core/replica-set-secondary/>` or vice versa as
   the result of an election, |compass-short| may either forcibly close
   the connection or display stale data.
