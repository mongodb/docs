
.. list-table::
   :stub-columns: 1
   :widths: 20 14 66

   * - instanceSizes
     - array
     - List of instances sizes that this cloud provider supports.

   * - instanceSizes[n].availableRegions
     - array
     - List of regions that this cloud provider supports for this
       instance size.

   * - instanceSizes[n].availableRegions[m].default
     - Boolean
     - Flag that indicates whether the cloud provider sets this region
       as its default.

       - **AWS** defaults to **US_EAST_1**.
       - **GCP** defaults to **CENTRAL_US**.
       - **AZURE** defaults to **US_WEST_2**.

   * - instanceSizes[n].availableRegions[m].name
     - string
     - Label that identifies the supported region.

       **See also:**

       - :doc:`AWS regions </reference/amazon-aws>`
       - :doc:`GCP regions </reference/google-gcp>`
       - :doc:`Azure regions </reference/microsoft-azure>`

   * - instanceSizes[n].name
     - string
     - Label that identifies the instance size or cluster tier.

   * - provider
     - string
     - Cloud providers that the response includes. Allowable values
       include **AWS**, **GCP**, and **AZURE**.
