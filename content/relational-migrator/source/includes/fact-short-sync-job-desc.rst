- Snapshot migration jobs migrate all data once, and then stop.
- Continuous migration jobs run a snapshot migration and then enter 
  a :abbr:`CDC (Change Data Capture)` stage, which continuously replicates 
  data changes.