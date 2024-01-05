.. list-table::
    :header-rows: 1
    :widths: 15 25 10 10 10 10 10 10

    * - Architecture
      - Distro/OS
      - 6.0
      - 5.0
      - 4.4
      - 4.2
      - 4.0
      - 3.6
    * - x86_64
      - RHEL/CentOS/Oracle Linux 7 :sup:`1`
      - :icon:`check-circle`
      - :icon:`check-circle`
      - :icon:`check-circle`
      - :icon:`check-circle`
      - :icon:`check-circle`
      - :icon:`check-circle`
    * -
      - RHEL/Rocky/Alma Linux/Oracle Linux 8 :sup:`1` :sup:`2`
      - :icon:`check-circle`
      - :icon:`check-circle`
      - :icon:`check-circle`
      - :icon:`check-circle`
      - :icon:`check-circle`
      - :icon:`check-circle`
    * - 
      - RHEL/Rocky/Alma Linux/Oracle Linux 9 :sup:`1` :sup:`2`
      - :icon:`check-circle`
      - :icon:`check-circle`
      - 
      - 
      - 
      - 
    * -
      - Amazon Linux 2
      - :icon:`check-circle`
      - :icon:`check-circle`
      - :icon:`check-circle`
      - :icon:`check-circle`
      - :icon:`check-circle`
      - :icon:`check-circle`
    * -
      - SUSE12
      - :icon:`check-circle`
      - :icon:`check-circle`
      - :icon:`check-circle`
      - :icon:`check-circle`
      - :icon:`check-circle`
      - :icon:`check-circle`
    * - 
      - SUSE15 
      - :icon:`check-circle`
      - :icon:`check-circle`
      - :icon:`check-circle`
      - :icon:`check-circle`
      -
      -
    * - 
      - Debian 8 :sup:`3`
      - 
      -
      -
      -
      - :icon:`check-circle`
      - :icon:`check-circle`
    * -
      - Debian 9 :sup:`3`
      -
      - :icon:`check-circle`
      - :icon:`check-circle`
      - :icon:`check-circle`
      - :icon:`check-circle`
      - :icon:`check-circle`
    * -
      - Debian 10 :sup:`3`
      - :icon:`check-circle`
      - :icon:`check-circle`
      - :icon:`check-circle`
      - :icon:`check-circle`
      -
      -
    * -
      - Debian 11 :sup:`3`
      - :icon:`check-circle`
      - :icon:`check-circle`
      -
      -
      -
      -
    * -
      - Ubuntu 16.x
      -
      -
      - :icon:`check-circle`
      - :icon:`check-circle`
      - :icon:`check-circle`
      - :icon:`check-circle`
    * -
      - Ubuntu 18.x 
      - :icon:`check-circle`
      - :icon:`check-circle`
      - :icon:`check-circle`
      - :icon:`check-circle`
      - :icon:`check-circle`
      - :icon:`check-circle`
    * - 
      - Ubuntu 20.x
      - :icon:`check-circle`
      - :icon:`check-circle`
      - :icon:`check-circle`
      -
      -
      -
    * - 
      - Ubuntu 22.x :sup:`4`
      - :icon:`check-circle`
      - 
      - 
      -
      -
      -
    * - 
      - Windows
      - :icon:`check-circle`
      - :icon:`check-circle`
      - :icon:`check-circle`
      - :icon:`check-circle`
      - :icon:`check-circle`
      - :icon:`check-circle`
    * - ARM
      - RHEL/Centos 8
      - :icon:`check-circle`
      - :icon:`check-circle`
      - :icon:`check-circle`
      -
      -
      -
    * - 
      - Amazon Linux 2
      - :icon:`check-circle`
      - :icon:`check-circle`
      - :icon:`check-circle`
      - :icon:`check-circle`
      -
      -
    * - PowerPC/ ppc64le
      - RHEL/ Centos 7
      - :icon:`check-circle`
      - :icon:`check-circle`
      - :icon:`check-circle`
      - :icon:`check-circle`
      - :icon:`check-circle`
      - :icon:`check-circle`
    * - 
      - RHEL/ Centos 8
      - :icon:`check-circle`
      - :icon:`check-circle`
      - :icon:`check-circle`
      - :icon:`check-circle`
      -
      -
    * - zSeries/ 390x
      - RHEL 7 
      - :icon:`check-circle`
      - :icon:`check-circle`
      - :icon:`check-circle`
      - :icon:`check-circle`
      - :icon:`check-circle`
      - :icon:`check-circle`
    * -
      - RHEL 8
      - :icon:`check-circle`
      - :icon:`check-circle`
      -
      -
      -
      -

:sup:`1` MongoDB supports Oracle Linux running
:abbr:`RHCK (Red Hat Compatible Kernel)` only. 
MongoDB doesn't support Oracle Linux running
:abbr:`UEK (Unbreakable Enterprise Kernel)`.

:sup:`2` Your Rocky and Alma Linux :abbr:`OS (Operating System)`
must include the ``redhat-lsb-core`` package. 

:sup:`3` Your Debian installation must include the
``lsb-release`` package. To learn more, see `lsb-release
<https://packages.debian.org/sid/lsb-release>`__. 

:sup:`4` |bic-full| isn't supported on Ubuntu 22.04.
