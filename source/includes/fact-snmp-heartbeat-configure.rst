|onprem| uses :rfc:`community-based SNMPv2 (SNMPv2c) <1901>`.

You can configure the |application| with two different types of |snmp|
Traps:

.. list-table::
   :widths: 15 50 15 20
   :header-rows: 1
   :stub-columns: 1

   * - Trap Type
     - Contents
     - Frequency
     - Target

   * - Heartbeat
     - Internal health assessment of the |application|
     - User set
     - one or more endpoints

   * - Alert
     - Data from a :doc:`configured Ops Manager Alert </tutorial/nav/alerts>`
     - User set
     - one or more endpoints

To configure the |application| to send SNMPv2c Heartbeat or Alert
Traps:

1. Download the :filedl:`MIB file </on-prem-monitoring/MMS-MONGODB-MIB.txt>`.

2. To configure SNMPv2c Traps:

   a. For SNMPv2c Heartbeat Traps:

      - Follow the
        :ref:`Modify a Custom Setting <opsmgr-config-add-custom>`
        procedure.

        Set the following key/value pairs:

        .. list-table::
           :widths: 50 50
           :header-rows: 1
           :stub-columns: 1

           * - Key
             - Value

           * - :setting:`snmp.default.heartbeat.interval`
             - Number of seconds between heartbeat notifications.

           * - :setting:`snmp.default.hosts`
             - Hosts that receive heartbeat traps on port 162.

   b. For SNMPv2c Alert Traps:

      - Follow the :ref:`Manage Alert Configurations <create-alert-configuration>`
        procedure to configure System, Global, or Project Alerts.
      - Use :guilabel:`SNMP Host` as the delivery method.
