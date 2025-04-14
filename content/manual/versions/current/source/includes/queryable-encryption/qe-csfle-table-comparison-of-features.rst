The following table describes potential security threats and how
MongoDB encryption features address them. Use these mechanisms together:
Role-Based Access Control, Encryption at Rest, Transport Encryption, and
In-Use Encryption. Note that you can't use both {+csfle+} and {+qe+} in the 
same collection.

.. important::

   This is a high-level summary meant for general comparison. For detailed
   information, see the
   `Overview of {+qe+}
   <https://cdn.bfldr.com/2URK6TO/as/64kp46t53v34xw37gkngbrg/An_Overview_of_Queryable_Encryption>`__
   and
   `Design and Analysis of a Stateless
   Document Database Encryption Scheme
   <https://cdn.bfldr.com/2URK6TO/as/jkwp857q2zr8fj5vqs24f5/Design__Analysis_Stateless_Document_Database_Encryption_Scheme>`__ 
   whitepapers.

.. list-table::
   :header-rows: 1
   :widths: 20 16 16 25 25
   
   * - Threat
     - TLS/SSL Transport Encryption
     - Encryption at Rest (EaR)
     - {+qe+} (Equality) + TLS/SSL + EaR
     - {+csfle-abbrev+} + TLS/SSL + EaR
   * - Network Snooping (attacker has access to network traffic)
     - Reveals :term:`operation metadata`
     - Reveals operation metadata
     - Reveals operation metadata
     - Reveals operation metadata
   * - Database Recoveries from Disk (attacker has physical disk access)
     - Reveals database
     - Reveals *size of database* and operation metadata
     - Reveals *size of database* and operation metadata
     - Reveals *size of database* and operation metadata
   * - :term:`Database exfiltration <database exfiltration>` from Disk and 
       Memory (attacker has physical disk access and multiple database 
       snapshots) [#db-exfil]_
     - Reveals database
     - Reveals database
     - Reveals *size of database* and operation metadata
     - Reveals *frequency of values* and operation metadata
   * - :term:`Advanced Persistent Threat` (attacker has long-term, continuous 
       access to network, disk, and memory while remaining undetected)
     - Reveals database
     - Reveals database
     - {+qe+} is not designed to protect against an ATP. See `whitepaper <https://cdn.bfldr.com/2URK6TO/as/64kp46t53v34xw37gkngbrg/An_Overview_of_Queryable_Encryption>`__ for details.
     - {+csfle-abbrev+} is not designed to protect against an ATP. See `whitepaper <https://cdn.bfldr.com/2URK6TO/as/64kp46t53v34xw37gkngbrg/An_Overview_of_Queryable_Encryption>`__ for details.

.. [#db-exfil]
   
   This assumes exfiltration occurs between completed operations. 
   See `whitepaper <https://cdn.bfldr.com/2URK6TO/as/64kp46t53v34xw37gkngbrg/An_Overview_of_Queryable_Encryption>`__
   for details.
