.. setting:: mms.https.dualConnectors

   *Type*: boolean

   *Default*: False

   
   Enables connections to |mms| using |http| and |https| concurrently.
   
   You can use this setting temporarily while you upgrade |mms| and the
   {+mdbagent+}\s to use |tls|. To ensure zero downtime, set to
   ``true`` and provide a value for :setting:`mms.http.bindhostname`.
   After you configure |mms| and the {+mdbagent+}\s, set to ``false``.
   
   .. important::
   
      |mms| is accessible using insecure connections while
      ``mms.https.dualConnectors`` is ``true``.
   
      Set ``mms.https.dualConnectors`` to ``false`` to allow secure
      connections only after you have updated the {+mdbagent+}\s to use
      |tls| connections.
   

