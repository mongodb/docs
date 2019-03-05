|onprem| uses SNMP v2c. You can configure the |application| to send a
periodic heartbeat trap notification (v2c) that contains an internal
health assessment of the |application|. The |application| can send
traps to one or more endpoints on the standard SNMP UDP port 162.

To configure the |application| to send trap notifications, first
download the Management Information Base (MIB) file at
`<http://downloads.mongodb.com/on-prem-monitoring/MMS-MONGODB-MIB.txt>`_ . 
Then add the following settings as custom settings. To do
so, click the :guilabel:`Admin` link, then the :guilabel:`General` tab,
then the :guilabel:`Ops Manager Config` page, and then the
:guilabel:`Custom` section.