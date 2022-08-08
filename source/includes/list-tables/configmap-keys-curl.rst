.. list-table::
   :widths: 20 10 50 20
   :header-rows: 1

   * - Key
     - Type
     - Description
     - Example

   * - ``metadata.name``
     - string
     - Name of the |k8s| |k8s-obj|.

       .. include:: /includes/fact-resource-name-char-limit.rst

       .. seealso::

          - |k8s| documentation on `names <https://kubernetes.io/docs/concepts/overview/working-with-objects/names/>`__.
            This name must follow :rfc:`RFC1123 <1123>` naming
            conventions, using only lowercase alphanumeric
            characters, ``-`` or ``.``, and must start and end with an
            alphanumeric character.

     - ``my-project``

   * - ``metadata.namespace``
     - string
     - |k8s| |k8s-ns| where the |k8s-op-short| creates this
       |k8s-mdbrsc| and other |k8s-objs|.

     - ``mongodb``

   * - ``data.projectName``
     - string
     - Label for your |mms|
       :opsmgr:`Project </tutorial/manage-projects>`.

       The |k8s-op-short| creates the |mms| project if it does
       not exist. If you omit the ``projectName``, the |k8s-op-short|
       creates a project with the same name as your
       |k8s| resource.

       To use an existing project in a |com|
       organization, locate
       the ``projectName`` by clicking the :guilabel:`All Clusters`
       link at the top left of the |com| page, and
       searching by name in the :guilabel:`Search`
       box, or scrolling to find the name in the list.
       Each card in this list represents the
       combination of one |com| **Organization** and **Project**.

     - ``myProjectName``

   * - ``data.orgId``
     - string
     - 24 character hex string that uniquely
       identifies your
       |com| :opsmgr:`Organization </tutorial/manage-organizations>`.

       .. include:: /includes/admonitions/note-k8s-supported-in-om4.rst

       Depending on your |k8s-op-short| :ref:`credentials
       <create-k8s-credentials>`, this field is:

       - *Required* for :opsmgr:`Global Programmatic API Keys </reference/api/global-api-keys/>`.
       - *Optional* for :ref:`Organization Programmatic API Keys <create-org-app-api-key>`.

       .. tabs::
          
          .. tab:: Global API Keys
             :tabid: global

             You must specify an :ref:`existing Organization
             <create-organization>`.

             .. include:: /includes/steps/find-org-id.rst

          .. tab:: Organization API Keys
             :tabid: org
       
             If specified, the |k8s-op-short| links to the organization.
             
             To find the ``orgID`` of your organization:

             .. include:: /includes/steps/find-org-id.rst

             If omitted, |onprem| creates an organization called
             ``projectName`` that contains a project also called
             ``projectName``.

             You must have the :authrole:`Organization Project Creator`
             role to create a new project within an existing
             |com| organization.
              
     - ``5b890e0feacf0b76ff3e7183``

   * - ``data.baseUrl``
     - string
     - |url| to your |application| including the |fqdn| and port
       number.

       .. include:: /includes/admonitions/data-url-config-map-external-dbs.rst

       .. note::

          If you're using |cloud-short|, set the ``data.baseUrl`` value
          to ``https://cloud.mongodb.com``.

     - ``https://ops.example.com:8443``
