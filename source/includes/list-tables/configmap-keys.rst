.. list-table::
   :widths: 20 20 40 20
   :header-rows: 1

   * - Key
     - Type
     - Description
     - Example

   * - ``metadata.name``
     - string
     - Label for a |k8s| |k8s-obj|.

       .. seealso::

          - :setting:`metadata.name`
          - |k8s| documentation on `names <https://kubernetes.io/docs/concepts/overview/working-with-objects/names/>`__.
            This name must follow :rfc:`RFC1123 <1123>` naming
            conventions, using only lowercase alphanumeric
            characters, '-' or '.', and must start and end with an
            alphanumeric character.

     - ``myconfigmap``

   * - ``data.projectName``
     - string
     - Label for your |mms|
       :opsmgr:`Project </tutorial/manage-projects>`.

       .. admonition:: Let |k8s-op-short| create the Project
          :class: important

          The |k8s-op-short| creates the |mms| Project if it does
          not exist. It is **strongly recommended** to use the
          Operator to create a new Project for |k8s| to manage. The
          Operator adds additional internal information to Projects
          that it creates.

          If you omit the ``projectName``, the |k8s-op-short| creates
          a project with the same name as your |k8s| resource.

       If you need or want to use an existing Project, you can find
       the ``projectName`` by clicking the :guilabel:`All Clusters`
       link at the top left of the screen, then either search by
       name in the :guilabel:`Search` box or scroll to find the
       name in the list. Each card in this list represents the
       combination of one **Organization** and **Project**.

     - ``Development``

   * - ``data.orgId``
     - string
     - 24 character hex string that uniquely identifies your
       MongoDB :opsmgr:`Organization </tutorial/manage-organizations>`.
       You can find the ``orgId`` in your |onprem| |url|:

       1. Click the :guilabel:`Context` menu.
       2. Select your Organization.
       3. View the current |url| in your browser and copy the value
          displayed in the ``<orgId>`` placeholder below:

          | ``https://ops.example.com:8443/``
          | ``v2#/org/<orgId>/projects``

       .. important::

          This field is *optional*. If you omit the ``orgId``,
          |onprem| creates an Organization called ``projectName``
          that contains a Project also called ``projectName``.

          You must have the :authrole:`Organization Project Creator`
          role to create a new project
          *within an existing organization*.

          .. admonition:: Limited to |com| Organizations

             If you set this value, it can be for a |com|
             organization only. If you try to use an Atlas
             organization, the |k8s-op-short| may not work as
             intended.

     - | ``5cc9b333dd3e384a625a6615``

   * - ``data.baseUrl``
     - string
     - |url| to your |application| including the |fqdn| and port
       number.

       .. note::

          You may use |cloud-short| for the ``data.baseUrl`` value.

     - ``https://ops.example.com:8443``
