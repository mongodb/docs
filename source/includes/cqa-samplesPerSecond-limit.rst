samplesPerSeconds Upper Limit
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The upper limit for ``samplesPerSecond`` is ``50``. A higher rate 
causes the sampled queries to fill up 10GB of disk space in less than 
four days.

This table shows the estimated disk usage for each sample rate and 
duration combination: 

.. list-table::
   :header-rows: 1
   :widths: 20 20 20 20 20

   * - Average Sampled Query Size (kB)
     - ``samplesPerSecond``
     - Sampling Duration (Days)
     - Number of Sampled Queries
     - Total Size of Sampled Queries (GB)

   * - 0.5
     - 0.1
     - 7
     - 60,480
     - 0.03024

   * - 0.5
     - 10
     - 7
     - 6,048,000
     - 3.024

   * - 0.5
     - 50
     - 7
     - 30,240,000
     - 15.12

   * - 1000
     - 50
     - 1
     - 4,320,000
     - 4320

   * - 16,000
     - 50
     - 1 
     - 432,0000
     - 69,120
