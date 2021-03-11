.. list-table::
   :widths: 20 60 20
   :header-rows: 1
   :stub-columns: 1

   * - Server Intention
     - Environment Purpose
     - License Requirement

   * - Production Server
     - Hosts your application to your internal or external end users.

       .. important::

          If an end user might use an environment, it functions as a
          Production environment. This applies whether the environment
          also provides testing, quality assurance, evaluation, or
          development capabilities.

     - One license per server

   * - Test/QA Server
     - This type of environment can be used to:

       .. list-table::
          :widths: 25 75

          * - Test
            - Exercises your application to verify that it works as
              designed and expected. The platform configuration might
              be a less performant version of Production in compute,
              network, and storage capability.

          * - Assure system quality
            - Validates your application against a combination of data,
              hardware, and software configured to simulate Production.
              The platform configuration should be a smaller scale of
              Production in compute, network, and storage capability.

          * - Stage
            - Simulates the Production environment including
              performance testing and release candidate approval. The
              platform configuration should mirror Production in
              compute, network, and storage capability.

     - One license per server

   * - Development Server
     - Hosts in progress design, code, debugging or some combination
       thereof for your application. Used to evaluate if the current
       state of your application can be promoted to another
       environment.
     - None

   * - RAM Pool
     - Provides any combination of servers for any environment purpose.
     - One license for any number of servers up to the maximum of
       the total GB of RAM you purchased across these servers.

.. cond:: onprem

   .. list-table::
      :stub-columns: 1
      :widths: 20 60 20

      * - Backing Database
        - Hosts your |onprem| backing database.
          :ref:`enable-application-database-monitoring` to enable this
          option.
        - None

