.. setting:: mms.monitoring.agent.session.timeoutMillis

   *Type*: integer

   *Default*: 90000

   
   Interval that |mms| uses to determine if a standby agent should
   start monitoring. If |mms| does not hear from a {+magent+} for
   the duration specified, |mms| promotes a standby agent. Configuring
   the timeout below ``90000`` (90 seconds) will cause |mms| to fail at
   startup with a configuration error.
   
   

