.. list-table::
  :header-rows: 1
  :widths: 30 70
  :stub-columns: 1

  * - Field
    - Value

  * - Project
    - Project that contains your Realm application.

  * - Realm App
    - Realm app that's issuing the user token.

  * - Fetch data using Realm app (**Optional**)
    - Toggle to enable |charts-short| to fetch user data and rules from 
      a Realm Service.

      If enabled, |charts-short| retrieves data from the service you
      specify in the :guilabel:`Realm Service Name` field.

      Enabling this option allows you to define rules in Realm to 
      control the data that |charts-short| displays for specific 
      collections or users.

      For more information, see :stitch:`Filter Incoming Queries 
      </mongodb/filter-incoming-queries/>` in the Realm documentation.

  * - Realm Service Name
    - The name of the service in your Realm app that |charts-short| uses 
      to retrieve the data for your chart.

      .. example::

         ``mongodb-atlas``
