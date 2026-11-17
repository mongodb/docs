.. _configure-adfs-idp-oidc:

To register your |oidc| application with Microsoft Active Directory
Federation Services (AD FS), you must have an AD FS server that is joined
to an Active Directory domain and has a publicly trusted SSL certificate.

Use the following procedure to register your |oidc| application with AD FS:

.. :snippet-start: oidc-adfs-instructions
.. :snippet-output: content/manual/upcoming/source/includes/oidc-adfs-instructions.rst, content/manual/manual/source/includes/oidc-adfs-instructions.rst, content/manual/v8.3/source/includes/oidc-adfs-instructions.rst, content/manual/v8.0/source/includes/oidc-adfs-instructions.rst, content/manual/v7.0/source/includes/oidc-adfs-instructions.rst, content/ops-manager/upcoming/source/includes/oidc-adfs-instructions.rst, content/ops-manager/current/source/includes/oidc-adfs-instructions.rst, content/ops-manager/v8.0/source/includes/oidc-adfs-instructions.rst

.. procedure::
   :style: normal

   .. step:: Update the Federation Service Identifier.

      a. In Server Manager, go to :guilabel:`Tools → AD FS Management`.

      #. Click :guilabel:`Edit Federation Service Properties`.

      #. In the :guilabel:`Federation Service identifier` field, change
         the value from ``https://<domain>/adfs/services/trust`` to
         ``https://<domain>/adfs``.
         
         ``<domain>`` should be replaced with the name of the Active Directory
         domain that your AD FS server belongs to.

      #. Click :guilabel:`OK`.

      The Federation Service Identifier you update in this step is the issuer
      URI that you use when
      :ref:`configuring your OIDC provider in MongoDB <configure-oidc>`.
      If these values don't match, authentication fails because of a token
      issuer mismatch.

   .. step:: Create an application group.

      a. In AD FS Management, open the :guilabel:`Add Application Group
         Wizard`.

      #. In the :guilabel:`Name` field, enter a name for your
         application group.

      #. In the :guilabel:`Template` section, select
         :guilabel:`Native application accessing a web API`.

      #. Click :guilabel:`Next`.

   .. step:: Configure the native application.

      a. Copy the value in the :guilabel:`Client Identifier` field for
         later use.

      #. In the :guilabel:`Redirect URI` field, enter
         ``http://localhost:27097/redirect`` and click :guilabel:`Add`.

      #. Click :guilabel:`Next`.

   .. step:: Configure the web API.

      a. In the :guilabel:`Identifier` field, paste the client identifier
         that you copied in the previous step and click :guilabel:`Add`.

      #. Click :guilabel:`Next`.

   .. step:: Choose an access control policy.

      Select a policy that grants access to everyone or to specific
      groups, then click :guilabel:`Next`.

   .. step:: Configure application permissions.

      a. In the :guilabel:`Permitted scopes` section, select
         :guilabel:`openid`. No other scopes are required.

      #. Click :guilabel:`Next`.

      #. Review the :guilabel:`Summary` page, then click
         :guilabel:`Next`.

      #. Click :guilabel:`Close`.

   .. step:: Add the ``groups`` and ``sub`` claims to the access token.

      MongoDB reads the ``groups`` and ``sub`` claims from the access
      token. By default, AD FS includes ``sub`` only in the ID token and
      sends an ``idsub`` claim in the access token instead. To add both
      claims to the access token, create an issuance transform rule on
      your web API:

      a. In AD FS Management, open the properties for your application
         group.

      #. In the :guilabel:`Applications` section, select your web API
         and click :guilabel:`Edit`.

      #. On the :guilabel:`Issuance Transform Rules` tab, click
         :guilabel:`Add Rule`.

      #. In the :guilabel:`Claim rule template` field, select
         :guilabel:`Send LDAP Attributes as Claims` and click
         :guilabel:`Next`.

      #. In the :guilabel:`Claim rule name` field, enter a name for the
         rule.

      #. In the :guilabel:`Attribute store` field, select
         :guilabel:`Active Directory`.

      #. Map the following LDAP attributes to outgoing claim types:

         .. list-table::
            :header-rows: 1
            :widths: 50 50

            * - LDAP Attribute
              - Outgoing Claim Type

            * - :guilabel:`Token-Groups - Unqualified Names`
              - ``groups``

            * - :guilabel:`User-Principal-Name`
              - ``sub``

      #. Click :guilabel:`OK`.

.. :snippet-end:
