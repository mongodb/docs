.. important::

   Before you attempt any upgrade, please familiarize yourself with the
   content of this document.

If you need guidance on upgrading to |newversion|, `MongoDB offers major version
upgrade services
<https://www.mongodb.com/products/consulting?jmp=docs>`_ to help ensure
a smooth transition without interruption to your MongoDB application.

Upgrade Recommendations and Checklists
--------------------------------------

When upgrading, consider the following:

Upgrade Version Path
~~~~~~~~~~~~~~~~~~~~

To upgrade an existing MongoDB deployment to |newversion|, you must be
running a |oldseries| release.

To upgrade from a version earlier than the |oldseries|, you must
successively upgrade major releases until you have upgraded to
|oldseries|. For example, if you are running a |olderseries|, you must
|upgradefirst| *before* you can upgrade to |newversion|.

Preparedness
~~~~~~~~~~~~

Before beginning your upgrade, see the |compatibility| document to
ensure that your applications and deployments are compatible with
MongoDB |newversion|. Resolve the incompatibilities in your deployment before
starting the upgrade.

Before upgrading MongoDB, always test your application in a staging
environment before deploying the upgrade to your production
environment.


Downgrade Consideration
~~~~~~~~~~~~~~~~~~~~~~~

|downgradepath|





