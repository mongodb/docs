:ref:`Progress Monitor <health-managers-progress-monitor>` runs tests 
to ensure that |HM| checks do not become stuck or 
unresponsive. Progress Monitor runs these tests in intervals specified 
by ``interval``. If a health check begins but does not complete within
the timeout given by ``deadline``, Progress Monitor stops the 
:ref:`mongos <mongos>` and removes it from the cluster.
