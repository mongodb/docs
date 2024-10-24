.. list-table::
   :widths: 20 14 66
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - connectionStrings
     - object
     - Set of connection strings that your applications use to connect
       to this {+Serverless-instance+}. This resource returns this
       object after the {+Serverless-instance+} finishes deploying, not
       during the {+Serverless-instance+} deployment.

   * - connectionStrings.standardSrv
     - string
     - Public ``mongodb+srv://`` connection string that you can use to
       connect to this {+Serverless-instance+}.

   * - createDate
     - string
     - Timestamp that indicates when MongoDB Cloud created the
       {+Serverless-instance+}.  The timestamp displays in the ISO 8601
       date and time format in UTC.

   * - groupId
     - string
     - Unique 24-hexadecimal digit string that identifies the project
       that contains the {+Serverless-instance+}.

   * - id
     - string
     - Unique 24-hexadecimal digit string that identifies the
       {+Serverless-instance+}.

   * - mongoDBVersion
     - string
     - Version of MongoDB that the {+Serverless-instance+} runs, in
       ``<major version>.<minor version>`` format.

   * - name
     - string
     - Human-readable label that identifies the {+Serverless-instance+}.

   * - providerSettings
     - object
     - Group of settings that configure the provisioned MongoDB
       database.

   * - providerSettings.backingProviderName
     - string
     - Cloud service provider on which MongoDB Cloud provisioned the
       {+Serverless-instance+}.

   * - providerSettings.providerName
     - string
     - This value will always be the string literal ``SERVERLESS``.

   * - providerSettings.regionName
     - string
     - Human-readable label that identifies the physical location of
       your MongoDB {+Serverless-instance+}. The region you choose can
       affect network latency for clients accessing your databases.

   * - serverlessBackupOptions.serverlessContinuousBackupEnabled
     - boolean
     - Flag that indicates whether the {+Serverless-instance+} uses 
       :guilabel:`Serverless Continuous Backup`. If this parameter is 
       ``false``, the {+Serverless-instance+} uses 
       :guilabel:`Basic Backup`.

       .. include:: /includes/list-table-serverless-backup-options.rst

   * - stateName
     - string
     - Stage of deployment of this {+Serverless-instance+} when the
       resource made its request.
