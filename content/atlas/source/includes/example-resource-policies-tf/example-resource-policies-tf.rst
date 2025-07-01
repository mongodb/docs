.. _tf-restrict-cloud-provider:

Restrict Cloud Provider
~~~~~~~~~~~~~~~~~~~~~~~

The following example prevents users from creating a {+cluster+} 
on all cloud providers except |aws|:

.. literalinclude:: /includes/example-resource-policies-tf/example-resource-policies-terraform.tf
   :language: terraform
   :start-after: # start-restrict-provider
   :end-before: # end-restrict-provider

.. _tf-restrict-region:

Restrict Region
~~~~~~~~~~~~~~~

The following example uses the ``unless`` clause to allow users to 
create {+clusters+} *only* in the regions ``aws:us-east-1`` and
``aws:eu-central-1``:

.. literalinclude:: /includes/example-resource-policies-tf/example-resource-policies-terraform.tf
   :language: terraform
   :start-after: # start-restrict-region
   :end-before: # end-restrict-region

.. _tf-restrict-provider-region:

Restrict Cloud Provider and Region
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following example uses the ``unless`` clause to allow users to create
{+clusters+} *only* on |gcp| or in the regions ``aws:us-east-1`` and
``aws:eu-central-1``:

.. literalinclude:: /includes/example-resource-policies-tf/example-resource-policies-terraform.tf
   :language: terraform
   :start-after: # start-provider-region
   :end-before: # end-provider-region

.. _tf-restrict-ip-addresses:

Restrict IP Addresses
~~~~~~~~~~~~~~~~~~~~~~

The following example prevents users from editing a project 
from a wildcard IP (``0.0.0.0/0``):

.. literalinclude:: /includes/example-resource-policies-tf/example-resource-policies-terraform.tf
   :language: terraform
   :start-after: # start-restrict-ip
   :end-before: # end-restrict-ip
