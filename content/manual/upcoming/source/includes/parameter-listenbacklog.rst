.. option:: --listenBacklog <number>

   *Default*: Target system ``SOMAXCONN`` constant
   
   The maximum number of connections that can exist in the listen
   queue.
   
   .. warning ::
   
      Consult your local system's documentation to understand the
      limitations and configuration requirements before using this
      parameter.
   
   .. important::
   
      To prevent undefined behavior, specify a value for this
      parameter between ``1`` and the local system ``SOMAXCONN``
      constant.

   The default value for the ``listenBacklog`` parameter depends on the 
   target system. On Linux, MongoDB uses ``/proc/sys/net/core/somaxconn``. 
   On all other target systems, MongoDB uses the compile time constant 
   ``SOMAXCONN``.

   Some systems may interpret ``SOMAXCONN`` symbolically, and others
   numerically. The actual *listen backlog* applied in practice may
   differ from any numeric interpretation of the ``SOMAXCONN`` constant
   or argument to ``--listenBacklog``.
   
   Passing a value for the ``listenBacklog`` parameter that exceeds the
   ``SOMAXCONN`` constant for the local system is, by the letter of the
   standards, undefined behavior. Higher values may be silently integer
   truncated, may be ignored, may cause unexpected resource
   consumption, or have other adverse consequences.
