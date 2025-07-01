When you use your own cloud provider |kms|, |service| automatically rotates
MongoDB Master Keys at least every 90 days. Your key rotation will begin
during a :ref:`maintenance window <configure-maintenance-window>`,
if you have one configured. Deferring maintenance (either manually or automatically)
may cause the key to be rotated past the 90-day mark.
Keys are rotated on a
rolling basis and the process does not require the data to be rewritten.
