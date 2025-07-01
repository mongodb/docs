.. setting:: automation.versions.source

   *Type*: string

   *Default*: ``remote``

   
   Indicates the source of MongoDB installer binaries.
   
   Accepted values for :setting:`automation.versions.source` and the conditions that must exist to
   set the value are:
   
   .. list-table::
      :widths: 20 80
      :header-rows: 1
   
      * - Value
        - Condition
      * - ``remote``
        - |onprem| and Agents have internet access.
      * - ``hybrid``
        - |onprem| has internet access, but Agents do not. |onprem|
          downloads MongoDB binaries from the internet; Agents download
          the binaries from |onprem|.
      * - ``local``
        - Neither |onprem| nor the Agents have internet access. An
          |onprem| administrator must upload the version manifest and
          the MongoDB binaries to the |onprem| host, as described in
          :doc:`/tutorial/configure-local-mode`.
   
   Corresponds to :setting:`Installer Download Source`.
   

