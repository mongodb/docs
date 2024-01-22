For {+database-deployments+} running on MongoDB version 7.0 
and later, don't use the number of tickets as a metric for 
overload alerts. Starting in MongoDB version 7.0, |service| 
dynamically adjusts the number of tickets. Instead, use the 
number of queued readers and writers as an overload metric.
