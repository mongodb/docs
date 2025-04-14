Consider increasing ``contention`` above the default value of ``8`` only if the
field has frequent concurrent write operations. Since high contention values
sacrifice find performance in favor of insert and update operations, the
benefit of a high contention factor for a rarely updated field is unlikely to
outweigh the drawback.

Consider decreasing ``contention`` if a field is often queried, but
rarely written. In this case, find performance is preferable to write and 
update performance.

You can calculate contention factor for a field by using a formula where:

- ``ω`` is the number of concurrent write operations on the field in a short
  time, such as 30ms. If unknown, you can use the server's number of virtual 
  cores.
- ``valinserts`` is the number of unique field/value pairs inserted since last
  performing :ref:`metadata compaction <qe-metadata-compaction>`.
- ``ω``:sup:`∗` is ``ω/valinserts`` rounded up to the nearest integer. For a
  workload of 100 operations with 1000 recent values, ``100/1000 = 0.1``,
  which rounds up to ``1``.

A reasonable contention factor, ``cf``, is the result of the following 
formula, rounded up to the nearest positive integer:

``(ω``:sup:`∗` ``· (ω``:sup:`∗` ``− 1)) / 0.2``

For example, if there are 100 concurrent write operations on a field in 30ms,
then ``ω = 100``. If there are 50 recent unique values for that field, then
``ω``:sup:`∗` ``= 100/50 = 2``. This results in ``cf = (2·1)/0.2 = 10``.

.. warning::

   Don't set the contention factor on properties of the data itself, such as
   the frequency of field/value pairs (:term:`cardinality`). Only set the contention factor based on your workload.
   
   Consider a case
   where ``ω = 100`` and ``valinserts = 1000``, resulting in ``ω``:sup:`∗` ``=
   100/1000 = 0.1 ≈ 1`` and ``cf = (1·0)/0.2 = 0 ≈ 1``. 20 of
   the values appear very frequently, so you set ``contention = 3`` instead. An
   attacker with access to multiple database snapshots can infer that the high
   setting indicates frequent field/value pairs. In this case, leaving
   ``contention`` unset so that it defaults to ``8`` would prevent the attacker
   from having that information.

For thorough information on contention and its cryptographic implications, see
"Section 9: Guidelines" in MongoDB's `Queryable Encryption Technical Paper <https://www.mongodb.com/collateral/queryable-encryption-technical-paper>`_