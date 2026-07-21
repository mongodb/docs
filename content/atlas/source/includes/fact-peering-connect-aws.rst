Before your new |vpc| peer can connect to your |service| cluster,
you must:

- Locate the |vpc| |cidr| block addresses (or subset), or the
  Security Groups, associated with the |vpc| configured
  in your project.
- Add at least one of these |cidr| blocks to the
  :ref:`access list <access-list>`.

Connect to |service| from an Application Deployed in AWS
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

After you have configured the VPC peering connection and added the
appropriate |cidr| blocks to your access list, you can connect to
your |service| cluster using the standard connection string.

.. procedure::
   :style: normal

   .. step:: Get your connection string.

      a. In the |service| UI, select your {+cluster+}, and click :guilabel:`Connect`.

      b. Select your preferred connection method.

      c. Copy your connection string.

   .. step:: Update your application running in |aws|.

      Add your connection string to your deployed application. The
      application automatically uses the peered VPC network when
      connecting to |service|.

.. seealso::

   - To learn about changes to |aws| network peering, see :ref:`atlas_20200331`.

   - To learn more about private connection strings, see :ref:`atlas-faq-connstring-private`.
