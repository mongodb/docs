.. setting:: snmp.default.hosts

   *Type*: string

   *Default*: blank

   
   Applies to **SNMPv2c Heartbeat Traps**.
   
   Comma-separated list of hosts where |onprem| sends 'heartbeat' traps
   on the standard |udp| port 162. You must set
   :setting:`snmp.default.hosts` to enable the |snmp| heartbeat
   functionality. If you leave this setting blank, |onprem| disables the
   |snmp| heartbeat functionality.
   
   

