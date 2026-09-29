.. setting:: mms.ignoreInitialUiSetup

   *Type*: boolean

   
   Set this to ``true`` to allow full use of |onprem| without requiring
   the first user account to complete the initial setup wizard.
   
   .. warning::
   
      |onprem| performs its regular pre-flight check to verify that it
      has all of the required settings. If one or more of those
      settings are not included in ``conf-mms.properties``, |onprem|
      refuses to start and lists which fields are missing in the log
      file.
   
   Before starting |onprem|, add the following required settings to
   ``conf-mms.properties`` to enable basic |onprem| functionality:
   
   .. list-table::
      :widths: 40 40 20
      :header-rows: 1
   
      * - UI Setting
        - ``conf-mms.properties`` Setting
        - Necessity
      * - :setting:`URL to Access Ops Manager`
        - :setting:`mms.centralUrl`
        - Required
      * - None
        - :setting:`mongo.mongoUri`
        - Required
      * - :setting:`Client Certificate Mode`
        - :setting:`mms.https.ClientCertificateMode`
        - Required
      * - :setting:`"From" Email Address <From Email Address>`
        - :setting:`mms.fromEmailAddr`
        - Required
      * - :setting:`"Reply To" Email Address <Reply To Email Address>`
        - :setting:`mms.replyToEmailAddr`
        - Required
      * - :setting:`Admin Email Address`
        - :setting:`mms.adminEmailAddr`
        - Required
      * - :setting:`Email Delivery Method Configuration`
        - :setting:`mms.emailDaoClass`
        - Required
      * - :setting:`Transport`
        - :setting:`mms.mail.transport`
        - Required
      * - :setting:`SMTP Server Hostname`
        - :setting:`mms.mail.hostname`
        - Required
      * - :setting:`SMTP Server Port`
        - :setting:`mms.mail.port`
        - Required
      * - :setting:`User Authentication Method`
        - :setting:`mms.userSvcClass`
        - Optional
      * - :setting:`Snapshot Interval (Hours)`
        - :setting:`brs.snapshotSchedule.interval`
        - Optional
      * - :setting:`Base Retention of Snapshots (in Days)`
        - :setting:`brs.snapshotSchedule.retention.base`
        - Optional
      * - :setting:`Daily Retention of Snapshots (in Days)`
        - :setting:`brs.snapshotSchedule.retention.daily`
        - Optional
      * - :setting:`Weekly Retention of Snapshots (in Weeks)`
        - :setting:`brs.snapshotSchedule.retention.weekly`
        - Optional
      * - :setting:`Monthly Retention of Snapshots (in Months)`
        - :setting:`brs.snapshotSchedule.retention.monthly`
        - Optional
      * - :setting:`Versions Directory`
        - :setting:`automation.versions.directory`
        - Optional
   
   .. note::
   
      Fields marked as *Optional* have default values. If you want to
      change them, you can provide the setting and a new value.
   
   .. example::
   
      The following values are examples. Substitute values appropriate
      to your |onprem| installation. You may add any of the other
      settings specified in this reference.
   
   To configure |a-mms| installation with the minimum functionality,
   add the following settings to ``conf-mms.properties``:
   
   .. code-block:: ini
   
      mms.ignoreInitialUiSetup=true
      mongo.mongoUri=mongodb://db1.example.com:27017,db2.example.com:27017,db3.example.com:27017
      mms.centralUrl=http://localhost:8080
      mms.fromEmailAddr=example@example.com
      mms.replyToEmailAddr=example@example.com
      mms.adminEmailAddr=example@example.com
      mms.mail.transport=smtp
      mms.mail.hostname=mail.example.com
      mms.mail.port=465
   
   

