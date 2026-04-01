Map your Domain
~~~~~~~~~~~~~~~

When you map your domain to the |idp|, |mms| directs users from
your domain to the :guilabel:`Login URL` for your identity provider
configuration.

When users visit the |mms| login page, they enter their email address.
If the email domain is associated with an IdP, |mms| sends them to
the Login URL for that IdP.

.. include:: /includes/admonitions/use-alternate-idp-multiple-mapped-domains.rst

Use the :guilabel:`Federation Management Console` to map your domain
to the |idp|:

.. include:: /includes/steps/manage-domain-mapping.rst
