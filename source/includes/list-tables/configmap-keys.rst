.. list-table::
   :widths: 20 10 50 20
   :header-rows: 1

   * - Key
     - Type
     - Description
     - Example

   * - ``metadata.name``
     - string
     - Label for a |k8s| |k8s-obj|.

       .. include:: /includes/fact-resource-name-char-limit.rst

       To learn more, see :setting:`metadata.name`, and
       |k8s| documentation on `names <https://kubernetes.io/docs/concepts/overview/working-with-objects/names/>`__.
       This name must follow :rfc:`RFC1123 <1123>` naming
       conventions, using only lowercase alphanumeric
       characters, '-' or '.', and must start and end with an
       alphanumeric character.

     - ``myconfigmap``

   * - ``data.projectName``
     - string
     - Label for your |mms|
       :opsmgr:`Project </tutorial/manage-projects>`.

       .. important:: Let |k8s-op-short| create the Project

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
     - *Required*. 24 character hex string that uniquely identifies your
       MongoDB :opsmgr:`Organization </tutorial/manage-organizations>`.
       You can find the ``orgId`` in your |onprem| |url|:

       1. Click the :guilabel:`Context` menu.
       2. Select your Organization.
       3. View the current |url| in your browser and copy the value
          displayed in the ``<orgId>`` placeholder below:

          | ``https://ops.example.com:8443/``
          | ``v2#/org/<orgId>/projects``

       .. important::

          You must have the :opsmgr:`Organization Project Creator </reference/user-roles/#Organization Project Creator>`
          role to create a new project *within an existing organization*.

          .. include:: /includes/admonitions/note-k8s-supported-in-om4.rst

       If you provide an empty string as your ``orgId``, |k8s-op-short| 
       creates an organization with the same name as your project.

     - | ``5cc9b333dd3e384a625a6615``

   * - ``data.baseUrl``
     - string
     - |url| to your |application| including the |fqdn| and port
       number.

       .. include:: /includes/admonitions/data-url-config-map-external-dbs.rst

       If you're using |cloud-short|, set the ``data.baseUrl`` value
       to ``https://cloud.mongodb.com``.

     - ``https://ops.example.com:8443``
