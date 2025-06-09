If you want to create a :manual:`capped collection </core/capped-collections>`,
select the :guilabel:`Capped Collection` checkbox and enter the maximum bytes.

If you want to use :manual:`custom collation
</reference/collation/#collation-document>` on the collection,
select the :guilabel:`Use Custom Collation` checkbox and select the
desired collation settings.   

.. BEGIN-COMPASS-ONLY

If your deployment is connected using :guilabel:`In-Use Encryption`, you can 
use :v6.0:`Queryable Encryption </core/queryable-encryption/>` on the newly 
created collection. Check the :guilabel:`Queryable Encryption` option
and indicate the following encryption properties:

- :v6.0:`Encrypted Fields </core/queryable-encryption/fundamentals/encrypt-and-query/>`.

- (Optional) :v6.0:`KMS Provider </core/queryable-encryption/fundamentals/kms-providers/>`.

- (Optional) :v6.0:`Key Encryption Key </core/queryable-encryption/fundamentals/keys-key-vaults/>`. 

.. END-COMPASS-ONLY
