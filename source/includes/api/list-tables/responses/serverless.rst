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
       to this {+serverless-instance+}. This resource returns this
       object after the {+serverless-instance+} finishes deploying, not
       during the {+serverless-instance+} deployment.

   * - connectionStrings.standardSrv
     - string
     - Public ``mongodb+srv://`` connection string that you can use to
       connect to this {+serverless-instance+}.

   * - createDate
     - string
     - Timestamp that indicates when MongoDB Cloud created the
       {+serverless-instance+}.  The timestamp displays in the ISO 8601
       date and time format in UTC.

   * - groupId
     - string
     - Unique 24-hexadecimal digit string that identifies the project
       that contains the {+serverless-instance+}.

   * - id
     - string
     - Unique 24-hexadecimal digit string that identifies the
       {+serverless-instance+}.

   * - mongoDBVersion
     - string
     - Version of MongoDB that the {+serverless-instance+} runs, in
       ``<major version>.<minor version>`` format.

   * - name
     - string
     - Human-readable label that identifies the {+serverless-instance+}.

   * - providerSettings
     - object
     - Group of settings that configure the provisioned MongoDB
       database.

   * - providerSettings.backingProviderName
     - string
     - Cloud service provider on which MongoDB Cloud provisioned the
       {+serverless-instance+}.

   * - providerSettings.providerName
     - string
     - This value will always be the string literal ``SERVERLESS``.

   * - providerSettings.regionName
     - string
     - Human-readable label that identifies the physical location of
       your MongoDB {+serverless-instance+}. The region you choose can
       affect network latency for clients accessing your databases.

   * - serverlessBackupOptions.serverlessContinuousBackupEnabled
     - boolean
     - Flag that indicates whether the {+serverless-instance+} uses 
       :guilabel:`Serverless Continuous Backup`. If this parameter is 
       ``false``, the {+serverless-instance+} uses 
       :guilabel:`Basic Backup`.

       .. include:: /includes/list-table-serverless-backup-options.rst

   * - stateName
     - string
     - Stage of deployment of this {+serverless-instance+} when the
       resource made its request.
