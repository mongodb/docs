.. list-table::
   :widths: 20 10 60 10

   * - Option 
     - Type
     - Description
     - Required?

   * - ``--authDB``
     - string
     - Name of the authentication database for this user. Defaults to
       ``admin``.
     - no

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
     - no
