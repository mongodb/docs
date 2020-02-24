.. note:: 

   For |ldap-provider|, the attributes in distinguished names must be
   upper case.

If your ``<managed-domain>`` consists of one or more subdomains,
you must add a ``DC`` (domainComponent) attribute to the 
distinguished name for each.

.. example::
  
  If your ``<managed-domain>`` is ``aadds.example.com``, the domain
  components are:

  ``DC=aadds,DC=example,DC=com``
