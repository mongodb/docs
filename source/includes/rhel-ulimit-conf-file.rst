RHEL places a max process limitation of 1024 which overrides ``ulimit``
settings. If ``/etc/security/limits.d/99-mongodb-nproc.conf`` does not
exist, create the file with new soft nproc and hard nproc values to
increase the process limit. See /etc/security/limits.d/90-nproc.conf
file as an example.
