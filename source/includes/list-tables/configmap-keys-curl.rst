.. list-table::
   :widths: 20 20 40 20
   :header-rows: 1

   * - Key
     - Type
     - Description
     - Example

   * - ``<configmap-name>``
     - string
     - Name of the |k8s| |k8s-obj|.

       .. include:: /includes/fact-resource-name-char-limit.rst

       .. seealso::

          - :setting:`metadata.name`
          - |k8s| documentation on `names <https://kubernetes.io/docs/concepts/overview/working-with-objects/names/>`__.
            This name must follow :rfc:`RFC1123 <1123>` naming
            conventions, using only lowercase alphanumeric
            characters, '-' or '.', and must start and end with an
            alphanumeric character.

     - ``myconfigmap``

   * - ``baseUrl``
     - string
     - |url| to your |application| including the |fqdn| and port
       number.

       .. include:: /includes/admonitions/data-url-config-map-external-dbs.rst

       .. note::

          If you're using |cloud-short|, set the ``data.baseUrl`` value
          to ``https://cloud.mongodb.com``.

     - ``https://ops.example.com:8443``

   * - ``projectName``
     - string
     - Label for your |mms|
       :opsmgr:`Project </tutorial/manage-projects>`.

       The |k8s-op-short| creates the |mms| project if it does
       not exist. If you omit the ``projectName``, the |k8s-op-short|
       creates a project with the same name as your |k8s| resource.

       If you need or want to use an existing project, you can find
       the ``projectName`` by clicking the :guilabel:`All Clusters`
       link at the top left of the screen, then either search by
       name in the :guilabel:`Search` box or scroll to find the
       name in the list. Each card in this list represents the
       combination of one **Organization** and **Project**.

     - ``Development``

   * - ``orgId``
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
          that contains a project also called ``projectName``.

          You must have the :authrole:`Organization project Creator`
          role to create a new project
          *within an existing organization*.

          .. admonition:: Limited to |com| Organizations

             If you set this value, it can be for a |com|
             organization only. If you try to use an Atlas
             organization, the |k8s-op-short| may not work as
             intended.

     - | ``5cc9b333dd3e384a625a6615``


