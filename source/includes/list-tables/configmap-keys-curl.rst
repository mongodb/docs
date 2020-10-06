.. list-table::
   :widths: 20 10 50 20
   :header-rows: 1

   * - Key
     - Type
     - Description
     - Example

   * - ``configmap-name``
     - string
     - Name of the |k8s| |k8s-obj|.

       .. include:: /includes/fact-resource-name-char-limit.rst

       .. seealso::

          - :setting:`metadata.name`
          - |k8s| documentation on `names <https://kubernetes.io/docs/concepts/overview/working-with-objects/names/>`__.
            This name must follow :rfc:`RFC1123 <1123>` naming
            conventions, using only lowercase alphanumeric
            characters, ``-`` or ``.``, and must start and end with an
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

       Depending on your |k8s-op-short| :ref:`credentials
       <create-k8s-credentials>`, this field is:

       - *Required* for :opsmgr:`Global Programmatic API Keys </reference/api/global-api-keys/>`.
       - *Optional* for :ref:`Organization Programmatic API Keys <create-org-app-api-key>`.

       .. tabs::
          
          .. tab:: Global API Keys
             :tabid: global

             You must specify an :ref:`existing Organization
             <create-organization>`.

             To find the ``orgId`` of your Organization:

             1. Click the :guilabel:`Context` menu.
             2. Select your Organization.
             3. View the current |url| in your browser and copy the   
                value displayed in the ``<orgId>`` placeholder below:

                | ``https://ops.example.com:8443/``
                | ``v2#/org/<orgId>/projects``

          .. tab:: Organization API Keys
             :tabid: org
       
             If specified, the |k8s-op-short| links to the Organization.
             
             You can find the Organization's ``orgId`` in your |onprem|
             |url|:

             1. Click the :guilabel:`Context` menu.
             2. Select your Organization.
             3. View the current |url| in your browser and copy the 
                value displayed in the ``<orgId>`` placeholder below:

                | ``https://ops.example.com:8443/``
                | ``v2#/org/<orgId>/projects``

             If omitted, |onprem| creates an Organization called
             ``projectName`` that contains a project also called
             ``projectName``.
             
             You must have the :authrole:`Organization Project Creator`
             role to create a new project within an existing
             organization.

       .. admonition:: Limited to |com| Organizations
          :class: important

          This value must be a |com|
          organization. The |k8s-op-short| might not work as
          expected when set to an |service| organization.

     - | ``5cc9b333dd3e384a625a6615``


