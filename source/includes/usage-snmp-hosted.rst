SNMP Integration
````````````````

The following is an example of using snmpwalk to query for SNMP health status::

    $ snmpwalk -v 2c -c public mms.acmewidgets.com:11611 MMS-10GEN-MIB::mmsHeartbeatObject
    MMS-10GEN-MIB::mmsHeartbeatHostnameId.0 = STRING: "[hostname]-[instance#]"
    MMS-10GEN-MIB::mmsHeartbeatInterval.0 = INTEGER: 300
    MMS-10GEN-MIB::mmsHeartbeatMessage.0 = STRING: "Healthy"
    MMS-10GEN-MIB::mmsHeartbeatMessage.0 = No more variables left in this MIB View
                                           (It is past the end of the MIB tree)

MIB File
````````

The MIB file is available for download at:
`<http://downloads.mongodb.com/on-prem-monitoring/MMS-10GEN-MIB.txt>`_

Each of the main alert notification fields contain a brief description
in the MIB file. an example of which follows: 

**Alert Trap**::

    mmsAlertId OBJECT-TYPE
        SYNTAX  DisplayString (SIZE (0.. 64))
        DESCRIPTION "The alert identification"

    mmsAlertGroupName OBJECT-TYPE
        SYNTAX DisplayString (SIZE (0.. 256))
        DESCRIPTION "The MMS group name from where the alert occurred"

    mmsAlertHostId OBJECT-TYPE
        SYNTAX DisplayString (SIZE (0.. 64))
        DESCRIPTION "The MMS Host ID of the affected host"

    mmsAlertHostAndPort OBJECT-TYPE
        SYNTAX DisplayString (SIZE (0.. 256))
        DESCRIPTION "The hostname:port of affected host"

    mmsAlertStatus OBJECT-TYPE
        SYNTAX INTEGER
        {
            new (1),
            reminder (2),
            clear (3)
        }
        DESCRIPTION "Is this alert new, a reminder of an existing alert, or clearing (closing)
                     an existing alert"

    mmsAlertUrl OBJECT-TYPE
        SYNTAX DisplayString (SIZE (0.. 256))
        DESCRIPTION "The url of the corresponding MMS alerts list page"

    mmsAlertMetricName OBJECT-TYPE
        SYNTAX DisplayString (SIZE (0.. 128))
        DESCRIPTION "The name of the triggering alert metric"

    mmsAlertMetricThreshold OBJECT-TYPE
        SYNTAX DisplayString (SIZE (0.. 16))
        DESCRIPTION "The threshold set on the metric"

    mmsAlertMetricValue OBJECT-TYPE
        SYNTAX DisplayString (SIZE (0.. 16))
        DESCRIPTION "The observed value of the metric which caused the alert to be triggered"

    mmsAlertReplSetName OBJECT-TYPE
        SYNTAX DisplayString (SIZE (0.. 64))
        DESCRIPTION "The Replica Set name (if applicable) to which this affected host belongs"

    mmsAlertSeverity OBJECT-TYPE
        SYNTAX INTEGER
        {
            debug (1),
            info (2),
            warning (3),
            error (4),
            critical (5)
        }
        DESCRIPTION "The severity of this alert, set automatically by MMS based on alert type"

    mmsAlertSummary OBJECT-TYPE
        SYNTAX DisplayString (SIZE (0.. 256))
        DESCRIPTION "Summary text description of the alert condition"

**Heartbeat/Health Trap**::

    mmsHeartbeatHostnameId OBJECT-TYPE
        SYNTAX DisplayString (SIZE (0.. 256))
        DESCRIPTION "Hostname and instance id of MMS server."

    mmsHeartbeatInterval OBJECT-TYPE
        SYNTAX      Integer32
        DESCRIPTION "Interval in seconds between successive heartbeat notifications."

    mmsHeartbeatMessage OBJECT-TYPE
        SYNTAX DisplayString (SIZE (0.. 256))
        DESCRIPTION "Text description of current MMS server health."
