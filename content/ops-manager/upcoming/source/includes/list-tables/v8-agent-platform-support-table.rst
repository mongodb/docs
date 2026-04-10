.. list-table::
    :header-rows: 1
    :widths: 15 25 20 20 20

    * - Architecture
      - Distro/OS
      - 8.0
      - 7.0
      - 6.0
    * - x86_64
      - RHEL/Oracle Linux 7 :sup:`3`
      - 
      - :icon:`check-circle`
      - :icon:`check-circle`
    * -
      - RHEL/Rocky/Alma Linux/Oracle Linux 8
      - :icon:`check-circle`
      - :icon:`check-circle`
      - :icon:`check-circle`
    * - 
      - RHEL/Rocky/Alma Linux/Oracle Linux 9
      - :icon:`check-circle`
      - :icon:`check-circle`
      - :icon:`check-circle`
    * -
      - Amazon Linux 2
      - 
      - :icon:`check-circle`
      - :icon:`check-circle`
    * -
      - Amazon Linux 2023
      - :icon:`check-circle`
      - :icon:`check-circle`
      - 
    * -
      - SUSE12
      - 
      - :icon:`check-circle`
      - :icon:`check-circle`
    * - 
      - SUSE15
      - :icon:`check-circle`
      - :icon:`check-circle`
      - :icon:`check-circle`
    * -
      - Debian 10 :sup:`3`
      -
      -
      - :icon:`check-circle`
    * -
      - Debian 11
      - 
      - :icon:`check-circle`
      - :icon:`check-circle`
    * -
      - Debian 12
      - :icon:`check-circle`
      - :icon:`check-circle`
      - 
    * -
      - Ubuntu 18.x :sup:`3`
      -
      -
      - :icon:`check-circle`
    * - 
      - Ubuntu 20.x
      - :icon:`check-circle`
      - :icon:`check-circle`
      - :icon:`check-circle`
    * - 
      - Ubuntu 22.x :sup:`1`
      - :icon:`check-circle`
      - :icon:`check-circle`
      - :icon:`check-circle`
    * - 
      - Ubuntu 24.x 
      - :icon:`check-circle`
      - 
      -
    * - 
      - Windows
      - :icon:`check-circle`
      - :icon:`check-circle`
      - :icon:`check-circle`
    * - ARM
      - RHEL 8
      - :icon:`check-circle`
      - :icon:`check-circle`
      - :icon:`check-circle`
    * -
      - RHEL 9
      - :icon:`check-circle`
      - :icon:`check-circle`
      - :icon:`check-circle`
    * - 
      - Amazon Linux 2
      - 
      - :icon:`check-circle`
      - :icon:`check-circle`
    * -
      - Amazon Linux 2023
      - :icon:`check-circle`
      - :icon:`check-circle`
      - 
    * - 
      - Ubuntu 20.x
      - :icon:`check-circle`
      - :icon:`check-circle`
      - :icon:`check-circle`
    * - 
      - Ubuntu 22.x
      - :icon:`check-circle`
      - :icon:`check-circle`
      - :icon:`check-circle`
    * - 
      - Ubuntu 24.x 
      - :icon:`check-circle`
      - 
      -
    * - PowerPC/ ppc64le
      - RHEL 7 :sup:`3`
      - 
      - :icon:`check-circle`
      - :icon:`check-circle`
    * - 
      - RHEL 8
      - :icon:`check-circle`
      - :icon:`check-circle`
      - :icon:`check-circle`
    * - zSeries/ 390x :sup:`2`
      - RHEL 7 :sup:`3`
      - 
      - :icon:`check-circle`
      - :icon:`check-circle`
    * -
      - RHEL 8
      - :icon:`check-circle`
      - :icon:`check-circle`
      - :icon:`check-circle`

:sup:`1` |bic-full| isn't supported on Ubuntu 22.04.

:sup:`2` Do not upgrade IBM Z (s390x) deployments to |onprem| 8.0.21.
The {+mdbagent+} 8.0.21 binaries for IBM Z (s390x) are unavailable.
|onprem| 8.0.22 adds {+mdbagent+} binary support for IBM Z (s390x)
on RHEL 8. Deployments on earlier versions continue to run as before.

:sup:`3` |onprem| 8.0.21 removed support for the following platforms
from the {+mdbagent+}:

- Debian 10
- RHEL 7 (all minor versions)
- Ubuntu 18.04
