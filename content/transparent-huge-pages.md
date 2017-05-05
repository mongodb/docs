+++
title = "Disable Transparent Huge Pages (THP)"

tags = [
"mongodb",
"administration",
"performance",
"intermediate" ]
+++

# Disable Transparent Huge Pages (THP)

Note: This page describes how to disable Transparent Huge Pages on Red Hat Enterprise Linux and CentOS versions 6 and 7. For other systems, please consult your vendor's documentation.

Transparent Huge Pages (THP) is a Linux memory management system
that reduces the overhead of Translation Lookaside Buffer (TLB) lookups on
machines with large amounts of memory by using larger memory pages.

However, database workloads often perform poorly with THP,
because they tend to have sparse rather than contiguous memory access
patterns. You should disable THP on Linux machines to ensure best performance
with MongoDB.


## Init Script

Important: If you are using ``tuned`` or ``ktune`` (for example, if you are running Red Hat or CentOS 6+), you must additionally configure them so that THP is not re-enabled. See [Using tuned and ktune](#configure-thp-tuned).


### Step 1: Create the ``init.d`` script.

Create the following file at ``/etc/init.d/disable-transparent-hugepages``:

```sh

#!/bin/bash
### BEGIN INIT INFO
# Provides:          disable-transparent-hugepages
# Required-Start:    $local_fs
# Required-Stop:
# X-Start-Before:    mongod mongodb-mms-automation-agent
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: Disable Linux transparent huge pages
# Description:       Disable Linux transparent huge pages, to improve
#                    database performance.
### END INIT INFO

case $1 in
  start)
    if [ -d /sys/kernel/mm/transparent_hugepage ]; then
      thp_path=/sys/kernel/mm/transparent_hugepage
    elif [ -d /sys/kernel/mm/redhat_transparent_hugepage ]; then
      thp_path=/sys/kernel/mm/redhat_transparent_hugepage
    else
      return 0
    fi

    echo 'never' > ${thp_path}/enabled
    echo 'never' > ${thp_path}/defrag

    re='^[0-1]+$'
    if [[ $(cat ${thp_path}/khugepaged/defrag) =~ $re ]]
    then
      # RHEL 7
      echo 0  > ${thp_path}/khugepaged/defrag
    else
      # RHEL 6
      echo 'no' > ${thp_path}/khugepaged/defrag
    fi

    unset re
    unset thp_path
    ;;
esac

```


### Step 2: Make it executable.

Run the following command to ensure that the init script can be used:

```sh

sudo chmod 755 /etc/init.d/disable-transparent-hugepages

```


### Step 3: Configure your operating system to run it on boot.

Use the appropriate command to configure the new init script on your Linux
distribution.

| Distribution | Command |
| - | - | - |
| Ubuntu and Debian | ```sudo update-rc.d disable-transparent-hugepages defaults``` |
| SUSE | ```sudo insserv /etc/init.d/disable-transparent-hugepages``` |
| Red Hat, CentOS, Amazon Linux, and derivatives | ```sudo chkconfig --add disable-transparent-hugepages``` |


### Step 4: Override tuned and ktune, if applicable

If you are using ``tuned`` or ``ktune`` (for example, if you are running
Red Hat or CentOS 6+) you must now configure them to preserve the above
settings.

<span id="configure-thp-tuned"></span>


## Using ``tuned`` and ``ktune``

Important: If using ``tuned`` or ``ktune``, you must perform this step in addition to installing the init script.

``tuned`` and ``ktune`` are dynamic kernel tuning tools available on Red Hat
and CentOS that can disable transparent huge pages.

To disable transparent huge pages in ``tuned`` or ``ktune``, you need to edit or
create a new profile that sets THP to ``never``.


### Red Hat/CentOS 6


#### Step 1: Create a new profile.

Create a new profile from an existing default
profile by copying the relevant directory. In the example we use
the ``default`` profile as the base and call our new profile ``no-thp``.

```sh

sudo cp -r /etc/tune-profiles/default /etc/tune-profiles/no-thp

```


#### Step 2: Edit ``ktune.sh``.

Edit ``/etc/tune-profiles/no-thp/ktune.sh`` and add the following:

```cfg

set_transparent_hugepages never

```

to the ``start()`` block of the file, before the ``return 0``
statement.


#### Step 3: Enable the new profile.

Finally, enable the new profile by issuing:

```sh

sudo tuned-adm profile no-thp

```


### Red Hat/CentOS 7


#### Step 1: Create a new profile.

Create a new ``tuned`` profile directory:

```sh

sudo mkdir /etc/tuned/no-thp

```


#### Step 2: Edit ``tuned.conf``.

Create and edit ``/etc/tuned/no-thp/tuned.conf`` so that it contains the
following:

```ini

[main]
include=virtual-guest

[vm]
transparent_hugepages=never

```


#### Step 3: Enable the new profile.

Finally, enable the new profile by issuing:

```sh

sudo tuned-adm profile no-thp

```

<span id="test-thp-changes"></span>


## Test Your Changes

You can check the status of THP support by issuing the following commands:

```

cat /sys/kernel/mm/transparent_hugepage/enabled
cat /sys/kernel/mm/transparent_hugepage/defrag

```

On Red Hat Enterprise Linux, CentOS, and potentially other Red
Hat-based derivatives, you may instead need to use the following:

```

cat /sys/kernel/mm/redhat_transparent_hugepage/enabled
cat /sys/kernel/mm/redhat_transparent_hugepage/defrag

```

For both files, the correct output resembles:

```

always madvise [never]

```
