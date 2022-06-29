{+aws-pl+} supports 50 addressable targets, 
|service| can use port 1024 through port 65536,
but typically starts with port 1024. The ports 
can change under specific circumstances, including 
(but not limited to) cluster changes.

.. important::
   MongoDB strongly recommends using the DNS seedlist 
   private endpoint-aware connection string, so that DNS 
   automatically updates the ports that {+aws-pl+} uses if
   they change. For the same reason, MongoDB also strongly 
   recommends allow-listing the entire port range, instead
   of specific ports.
   