.. warning::
  
   {+qe+} defends against data exfiltration, not against adversaries with 
   persistent access to an environment, or those who can retrieve both 
   database snapshots and accompanying query transcripts/logs.

When using {+qe+}, equality and range queries offer similar security against
attackers with database snapshots. However, an attacker with access to both
database snapshots and query information is beyond the scope of {+qe+}'s
security guarantees. This is **especially** true for range queries, even if
only a small number of query transcripts or logs are retrieved. See `6.1:
Range Queries in the Persistent Model
<https://cdn.bfldr.com/2URK6TO/as/64kp46t53v34xw37gkngbrg/An_Overview_of_Queryable_Encryption>`__
in the overview whitepaper for details.