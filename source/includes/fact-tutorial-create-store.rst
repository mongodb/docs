A *store* is responsible for storing and maintaining data within the
React/Flux application architecture used by |compass| plugins.
The store responds to *events* and *actions*, resulting in
state changes which are then reflected by the component *view*.

This data flow is shown in the following diagram:

.. figure:: /images/compass/react-diagram.png

:ref:`Stores <plugins-stores>` listen to
:ref:`actions <plugins-actions>`.
:ref:`Components <plugins-components>` subscribe to stores.