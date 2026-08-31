If you want to create a :manual:`capped collection </core/capped-collections>`,
select the :guilabel:`Capped Collection` checkbox and enter the maximum bytes.

If you want to use :manual:`custom collation
</reference/collation/#collation-document>` on the collection,
select the :guilabel:`Use Custom Collation` checkbox and select the
desired collation settings.   

If your deployment is connected using :guilabel:`In-Use Encryption`, you can 
use :ref:`Queryable Encryption <qe-manual-feature-qe>` on the newly 
created collection. Check the :guilabel:`Queryable Encryption` option
and indicate the following encryption properties:

- :ref:`Encrypted Fields <qe-fundamentals-encrypt-query>`.

- (Optional) :ref:`KMS Provider <qe-fundamentals-kms-providers>`.

- (Optional) :ref:`Encryption Keys <qe-fundamentals-manage-keys>`.
