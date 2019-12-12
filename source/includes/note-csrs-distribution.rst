.. note::

   Distributing replica set members across two data centers provides
   benefit over a single data center. However, in a two data center
   distribution, if the data center with the majority of the members
   goes down, the replica set becomes read-only.

   If possible, distribute members across at least three data centers.
   For config server replica sets (CSRS), the best practice is to
   distribute across three (or more depending on the number of members)
   centers. If the cost of the third data center is prohibitive, one
   distribution possibility is to evenly distribute the data bearing
   members across the two data centers and store the remaining member
   in the cloud if your company policy allows.
