Map your Domain
~~~~~~~~~~~~~~~

Mapping your domain to the |idp| lets |service| know that users from your
domain should be directed to the :guilabel:`Login URL` for
your identity provider configuration.

When users visit the |service| login page, they enter their email address.
If the email domain is associated with an IdP, they are sent to the
Login URL for that IdP.

.. include:: /includes/admonitions/use-alternate-idp-multiple-mapped-domains.rst

Use the :guilabel:`Federation Management Console` to map your domain
to the |idp|:

.. include:: /includes/steps/manage-domain-mapping.rst
