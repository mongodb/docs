.. setting:: mms.http.bindhostname

   *Type*: string

   *Default*: 127.0.0.1

   
   The hostname or |ipaddr| at which {+mdbagent+}\s can connect to
   |mms| using |http|.
   
   You can use this setting temporarily while you upgrade |mms| and the
   {+mdbagent+}\s to use |tls|. To ensure zero downtime, set a value and
   set :setting:`mms.https.dualConnectors` to ``true``. After you
   configure |mms| and the {+mdbagent+}\s, remove the value.
   

