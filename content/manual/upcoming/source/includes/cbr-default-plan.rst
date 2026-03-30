Starting in MongoDB 8.3, multi-planning with a CBR backup is the default
plan selection mechanism for eligible queries. For a short trial period,
the multi-planner attempts to find a plan capable of returning a result
set within this short timeframe. If the attempt is unsuccessful, a set
of rules is applied to determine whether the multi-planner should
continue or if CBR should be used to determine the optimal plan.