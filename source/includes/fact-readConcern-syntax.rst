The readConcern option has the following syntax:

.. versionchanged:: 3.6

.. code-block:: javascript

   readConcern: { level: <value>, afterClusterTime: <Timestamp> }

.. important::

   Do not manually set the ``afterClusterTime``. MongoDB drivers set
   this value automatically for operations associated with
   :ref:`causally consistent sessions <causal-consistency>`.
