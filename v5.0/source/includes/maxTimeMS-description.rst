Specifies a time limit in milliseconds. 
If you do not specify a value for ``maxTimeMS``, operations will not time out. 
A value of ``0`` explicitly specifies the default unbounded behavior.

MongoDB terminates operations that exceed their allotted time limit
using the same mechanism as :method:`db.killOp()`. MongoDB only
terminates an operation at one of its designated :term:`interrupt 
points <interrupt point>`.