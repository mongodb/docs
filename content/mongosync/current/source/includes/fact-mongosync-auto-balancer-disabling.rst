Starting in version 1.17, ``mongosync`` disables the balancer on source 
and destination clusters during initialization if it detects that the 
balancers are not disabled.

This only applies during initialization. If ``mongosync`` detects that 
either balancer is enabled after the migration begins, ``mongosync`` fails.

After disabling the balancer, ``mongosync`` waits for 15 minutes to ensure that
in-progress chunk migrations complete before continuing with the migration. 

If the migration is not reversible and ``mongosync`` disables the source or destination
balancer during initialization, after a successful commit ``mongosync`` re-enables
the balancer(s) it disabled. If the migration is reversible, ``mongosync`` does not re-enable
any balancers to avoid making users wait 15 minutes.

:gold:`IMPORTANT:` If ``mongosync`` disables the balancer for either cluster
and then fails before commit, you must re-enable the balancer(s) manually
by using the :dbcommand:`balancerStart` database command if you do not plan
to run ``mongosync`` again.