.. list-table::
   :widths: 20 14 11 55
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Necessity
     - Description

   * - name
     - string
     - Required
     - Human-readable label that identifies the {+serverless-instance+}.

   * - providerSettings
     - object
     - Required
     - Group of settings that configure the provisioned MongoDB
       database.

   * - providerSettings.backingProviderName
     - string
     - Required
     - Cloud service provider on which MongoDB Cloud provisions the
       {+serverless-instance+}.

   * - providerSettings.providerName
     - string
     - Required
     - This value must be the string literal ``SERVERLESS``.

   * - providerSettings.regionName
     - string
     - Required
     - Human-readable label that identifies the physical location of
       your MongoDB {+serverless-instance+}. The region you choose can
       affect network latency for clients accessing your databases.
