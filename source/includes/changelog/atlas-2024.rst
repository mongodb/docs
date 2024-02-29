.. _atlas_2024_02_28:

28 February 2024 Release
~~~~~~~~~~~~~~~~~~~~~~~~~

- Supports archiving data using {+Online-Archive+} to |azure| storage
  for |service| {+clusters+} deployed on |azure|. To learn more,
  see :ref:`config-online-archive`.

.. _atlas_2024_02_14:

14 February 2024 Release
~~~~~~~~~~~~~~~~~~~~~~~~

- Introduces :ref:`{+atlas-sp+} <what-is-atlas-sp>` in
  public preview. With {+atlas-sp+}, you can process streaming data in 
  |service|.
- Supports |service| deployments in the following new 
  :ref:`cloud provider regions <cloud-providers-list>`:

  - |aws|
   
    - Israel (``il-central-1``)
    - Canada West (``ca-west-1``)

  - |azure|

    - Poland (``polandcentral``)
    - Israel Central (``israelcenttral``)
    - Italy North (``italynorth``)

  - |gcp|

    - Berlin, Germany (``europe-west10``)

- Supports adding resource tags to projects in |service|. To learn
  more, see :ref:`project-tags`.

- Fixes an issue where |service| inaccurately reported the 
  :guilabel:`network bytes out` metric that appears in the 
  :guilabel:`System Network` chart. This release resets this metric and 
  the previous values no longer appear. To learn more, see 
  :ref:`review-available-metrics` and :alert:`System Network Out is`.

.. _atlas_2024_01_24:

24 January 2024 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Supports MongoDB 7.2.

.. _atlas_2024_01_04:

4 January 2024 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Supports replica set to sharded cluster migrations on MongoDB
  6.0.8+ with Atlas Live Migration (pull). To learn more, see
  :ref:`c2c-pull-live-migration`.
- Supports cluster node disk pre-warming. To learn more, see
  :ref:`disk-pre-warming`.
