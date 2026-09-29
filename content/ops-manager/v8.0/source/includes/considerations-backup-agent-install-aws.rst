Running on Amazon EC2
+++++++++++++++++++++

If you run the Backup Agent on Amazon EC2, do not use the ``t1.micro``
instance type, which has a CPU scheduling policy that does not
typically provide sufficient capacity to support a Backup Agent for a
production deployment. Use a larger instance type instead.
