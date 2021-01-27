.. list-table::
   :header-rows: 1
   :widths: 20 10 60 10

   * - Option
     - Type
     - Description
     - Required?

   * - ``<alertID>``
     - string
     - Unique identifier of the alert you want to describe.
     - yes

   * - ``--output``, ``-o``
     - string 
     - .. include:: /includes/extracts/fact-basic-options-output.rst
     - no

   * - ``--profile``, ``-P``
     - string
     - Name of the profile where the public and private 
       keys for the project are saved. If omitted, uses the 
       {+default-profile+}. To learn more about creating a 
       profile, see :ref:`mcli-configure`.
     - no

   * - ``--projectId``
     - string
     - .. include:: /includes/extracts/fact-basic-options-project-id.rst
     - yes
