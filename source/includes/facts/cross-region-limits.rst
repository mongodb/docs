Clusters can span regions and cloud service providers. The total number
of nodes in clusters spanning across regions has a specific constraint
on a per-project basis.

|service| limits the total number of nodes in other regions in one
project to a total of 40. This total excludes:

- |gcp| regions communicating with each other
- {+Free-clusters+} or {+shared-clusters+}

The total number of nodes between any two regions must meet this
constraint.

.. example::

   If |a-service| project has nodes in clusters spread across three
   regions:

   - 30 nodes in **Region A**
   - 10 nodes in **Region B**
   -  5 nodes in **Region C**

   You can only add 5 nodes to **Region C** because:

   1. If you exclude Region C, Region A + Region B = 40.
      :icon-fa5:`check-circle`

   2. If you exclude Region B, Region A + Region C = 35, <= 40.
      :icon-fa5:`check-circle`

   3. If you exclude Region A, Region B + Region C = 15, <= 40.
      :icon-fa5:`check-circle`

   4. Each combination of regions with the added 5 nodes still meets
      the per-project constraint:

      - Region A + B = 40 :icon-fa5:`check-circle`
      - Region A + C = 40 :icon-fa5:`check-circle`
      - Region B + C = 20 :icon-fa5:`check-circle`

You can't create a multi-region cluster in a project if it has one or
more clusters spanning 40 or more nodes in other regions.

Contact |service| :manual:`support </support>` for questions
or assistance with raising this limit.



