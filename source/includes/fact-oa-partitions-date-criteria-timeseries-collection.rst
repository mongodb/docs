Enter up to two most commonly queried fields from the collection in the :guilabel:`Second most commonly queried field` and :guilabel:`Third most commonly queried field` fields respectively. To specify nested fields, use the :manual:`dot notation </core/document/#dot-notation>`. Do not include quotes (``""``) around nested fields that you specify using :manual:`dot notation </core/document/#dot-notation>`.

The specified fields are used to partition your archived data. Partitions are similar to folders. The date field is in the first position of the partition by default for the :guilabel:`Date Match` criteria. You can move another field to the first position of the partition if you frequently query by that field. 

The order of fields listed in the path is important in the same way as it is in :manual:`Compound Indexes </core/index-compound/>`. Data in the specified path is partitioned first by the value of the first field, and then by the value of the next field, and so on. |service| supports queries on the specified fields using the partitions. 

For example, suppose you are configuring the online archive for the ``movies`` collection in the ``sample_mflix`` database. If your archived field is the ``released`` date field, which you moved to the third position, your first queried field is ``title``, and your second queried field is ``plot``, your partition will look similar to the following: 

.. code-block:: sh 
   :copyable: false 

   /title/plot/released

|service| creates partitions first for the ``title`` field, followed by  the ``plot`` field, and then the ``released`` field. |service| uses the partitions for queries on the following fields:

- the ``title`` field,
- the ``title`` field and the ``plot`` field,
- the ``title`` field and the ``plot`` field and the ``released`` field.

|service| can also use the partitions to support a query on the ``title`` and ``released`` fields. However, in this case, |service| would not be as efficient in supporting the query as it would be if the query were on the ``title`` and ``plot`` fields only. Partitions are parsed in order; if a query omits a particular partition, |service| is less efficient in making use of any partitions that follow that. Since a query on ``title`` and ``released`` omits ``plot``, |service| uses the ``title`` partition more efficiently than the ``released`` partition to support this query. 
  
|service| can't use the partitions to support queries on fields not specified here. Also, |service| can't use the partitions to support queries that include the following fields without the ``title`` field:

- the ``plot`` field,
- the ``released`` field, or
- the ``plot`` and ``released`` fields.
