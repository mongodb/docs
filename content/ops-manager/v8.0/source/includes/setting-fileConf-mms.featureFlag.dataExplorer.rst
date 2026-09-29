.. setting:: mms.featureFlag.dataExplorer

   *Type*: string

   *Default*: ``controlled``

   Globally controls the availability of the Data Explorer feature in
   |onprem|. The default value ``controlled`` persists until you
   explicitly change it to ``enabled`` or ``disabled``.
   When set to ``disabled``, users cannot access the
   Data Explorer in any project. This setting overrides any
   project-level Data Explorer settings.

   .. list-table::
      :widths: 15 85
      :header-rows: 1

      * - Value
        - Description

      * - ``controlled``
        - (**Default**) Administrators can enable or disable Data
          Explorer on a per-Organization or per-Project basis.

      * - ``enabled``
        - Data Explorer is globally enabled for all Organizations
          and Projects.

      * - ``disabled``
        - Data Explorer is globally disabled. Users cannot access
          Data Explorer in any Project.
