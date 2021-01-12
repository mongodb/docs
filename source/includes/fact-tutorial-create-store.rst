A :ref:`store <plugins-stores>` is responsible for storing and
maintaining the
`state <https://redux.js.org/docs/Glossary.html#state>`_ of the
React/Flux application architecture used by |compass| plugins. The
store responds to *events* and *actions*, resulting in state changes
which are then reflected by the component's
`view <https://facebook.github.io/react-native/docs/view.html>`_.

This data flow is shown in the following diagram:

.. figure:: /images/compass/react-diagram.png
   :alt: React Data Flow

:ref:`Stores <plugins-stores>` listen to
:ref:`actions <plugins-actions>`.
:ref:`Components <plugins-components>` subscribe to stores.

.. note::

   For more information on *stores*, refer to the
   `Redux documentation <https://redux.js.org/docs/api/Store.html>`__.
