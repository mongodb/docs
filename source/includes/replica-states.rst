==========  ==========================================================
**Number**  **State**
----------  ----------------------------------------------------------
0           Starting up, phase 1 (parsing configuration)
1           Primary
2           Secondary
3           Recovering (initial syncing, post-rollback, stale members)
4           Fatal error
5           Starting up, phase 2 (forking threads)
6           Unknown state (the set has never connected to the member)
7           Arbiter
8           Down
9           Rollback
10          Removed
==========  ==========================================================
