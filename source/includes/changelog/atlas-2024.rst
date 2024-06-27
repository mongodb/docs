.. _atlas_2024_06_24:

24 June 2024 Release
~~~~~~~~~~~~~~~~~~~~

- Adds resource tags :ref:`defined in projects <project-tags>` to customer 
  invoice |csv| exports and invoice |api| responses. 

.. _atlas_2024_05_30:

30 May 2024 Release
~~~~~~~~~~~~~~~~~~~

- Adds the ability to unlink organizations from your paying organization from 
  the {+atlas-ui+}. To learn more, see :ref:`unlink-with-cross-org-billing`.

- Removes support for legacy two-factor authentication. 
  Use :ref:`multi-factor authentication <atlas-enable-mfa>` instead.

.. _atlas_2024_04_30:

30 April 2024 Release
~~~~~~~~~~~~~~~~~~~~~

- Introduces the general availability of |oidc| :ref:`Workforce Identity Federation <oidc-authentication-workforce>` 
  and :ref:`Workload Identity Federation <oidc-authentication-workload>`.

.. _atlas_2024_04_17:

17 April 2024 Release
~~~~~~~~~~~~~~~~~~~~~

- Adds the Migration Hub to |service|. The Migration Hub displays
  available migration resources and the status of migrations in progress.

.. _atlas_2024_02_28:

28 February 2024 Release
~~~~~~~~~~~~~~~~~~~~~~~~~

- Supports archiving data using {+Online-Archive+} to |azure| storage
  for |service| {+clusters+} deployed on |azure|. To learn more,
  see :ref:`config-online-archive`.

.. _atlas_2024_02_14:

14 February 2024 Release
~~~~~~~~~~~~~~~~~~~~~~~~

- Introduces :ref:`{+atlas-sp+} <atlas-sp-overview>` in
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
- Supports |gcp| for |service| oplog store. To learn more, see
  :ref:`pit-restore`. 

.. _atlas_2024_01_04:

4 January 2024 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Supports replica set to sharded cluster migrations on MongoDB
  6.0.8+ with Atlas Live Migration (pull). To learn more, see
  :ref:`c2c-pull-live-migration`.
- Supports cluster node disk pre-warming. To learn more, see
  :ref:`disk-pre-warming`.
