When ``M10`` and ``M20`` clusters hosted on AWS experience periods
of high usage, they can temporarily increase performance through
:aws:`bursting
</AWSEC2/latest/UserGuide/burstable-performance-instances.html>`.
During periods of low usage, ``M10`` and ``M20`` clusters accumulate
EC2 instance :aws:`credits
</AWSEC2/latest/UserGuide/burstable-credits-baseline-concepts.html#cpu-credits>`,
and these credits are depleted when bursting occurs. The :alert:`System: CPU
(Steal) % is` alert is triggered when the EC2 instance credit balance is
exhausted.
