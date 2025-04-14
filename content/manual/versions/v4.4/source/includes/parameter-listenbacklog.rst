.. option:: --listenBacklog <number>

   *Default*: Target system ``SOMAXCONN`` constant

   .. versionadded:: 3.6
   
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
   
   The default value for the ``listenBacklog`` parameter is set at
   compile time to the target system ``SOMAXCONN`` constant.
   ``SOMAXCONN`` is the maximum valid value that is documented for
   the *backlog* parameter to the *listen* system call.
   
   Some systems may interpret ``SOMAXCONN`` symbolically, and others
   numerically. The actual *listen backlog* applied in practice may
   differ from any numeric interpretation of the ``SOMAXCONN`` constant
   or argument to ``--listenBacklog``, and may also be constrained by
   system settings like ``net.core.somaxconn`` on Linux.
   
   Passing a value for the ``listenBacklog`` parameter that exceeds the
   ``SOMAXCONN`` constant for the local system is, by the letter of the
   standards, undefined behavior. Higher values may be silently integer
   truncated, may be ignored, may cause unexpected resource
   consumption, or have other adverse consequences.
   
   On systems with workloads that exhibit connection spikes, for which
   it is empirically known that the local system can honor higher
   values for the *backlog* parameter than the ``SOMAXCONN`` constant,
   setting the ``listenBacklog`` parameter to a higher value may reduce
   operation latency as observed by the client by reducing the number
   of connections which are forced into a backoff state.