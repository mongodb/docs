.. list-table::
   :header-rows: 1
   :widths: 40 20 10 30

   * - Name
     - Operating System
     - Type
     - Description

   * - ``hardware_system_cpu_nice``
     - Unix, Darwin
     - Counter
     - Time spent in user mode with low priority.
     
   * - ``hardware_system_cpu_io_wait``
     - Unix
     - Counter
     - Time waiting for I/O to complete.

   * - ``hardware_system_cpu_irq``
     - Unix
     - Counter
     - Time spent servicing interrupts.

   * - ``hardware_system_cpu_soft_irq``
     - Unix
     - Counter
     - Time spent servicing softirq's.

   * - ``hardware_system_cpu_steal``
     - Unix
     - Counter
     - Time spent in other operating systems when running in a virtual
       environment.

   * - ``hardware_system_cpu_guest``
     - Unix
     - Counter
     - Time spent running a virtual CPU for the guest operating systems under the control of the Linux kernel.

   * - ``hardware_system_cpu_guest_nice``
     - Unix
     - Counter
     - Time spent running a guest with an adjusted niceness.

   * - ``hardware_system_cpu_kernel_milliseconds``
     - All
     - Counter
     - Time spent in system mode.

   * - ``hardware_system_cpu_user_milliseconds``
     - All
     - Counter
     - Time spent in user mode.

   * - ``hardware_disk_metrics_weighted_time_io``
     - Unix
     - Counter
     - Weighted time spent doing I/O's.

   * - ``hardware_disk_metrics_physical_write_count``
     - Unix
     - Counter
     - Number of physical write I/O's processed.

   * - ``hardware_disk_metrics_physical_read_count``
     - Unix
     - Counter
     - Number of physical read I/O's processed.

   * - ``hardware_disk_metrics_total_time``
     - Unix
     - Counter
     - Total time this block device is active.

   * - ``hardware_disk_metrics_idle_time``
     - Windows
     - Counter
     - Time spent in the idle task.

   * - ``hardware_disk_metrics_disk_space_free_bytes``
     - All
     - Gauge
     - Disk space available in the mounted file system.

   * - ``hardware_disk_metrics_disk_space_used_bytes``
     - All
     - Gauge
     - Disk space used in the mounted file system.

   * - ``hardware_disk_metrics_read_count``
     - All
     - Counter
     - Number of read I/O's processed.

   * - ``hardware_disk_metrics_read_time_milliseconds``
     - All
     - Counter
     - Total wait time for read requests.

   * - ``hardware_disk_metrics_write_count``
     - All
     - Counter
     - Number of write I/O's processed.

   * - ``hardware_disk_metrics_write_time_milliseconds``
     - All
     - Counter
     - Total wait time for write requests.

   * - ``hardware_process_cpu_children_user``
     - Unix
     - Counter
     - Amount of time scheduled in user mode for this process to wait for children.

   * - ``hardware_process_cpu_children_kernel``
     - Unix
     - Counter
     - Amount of time scheduled in kernel mode for this process to wait for children.

   * - ``hardware_process_cpu_kernel_milliseconds``
     - All
     - Counter
     - Amount of time scheduled in kernel mode for this process.

   * - ``hardware_process_cpu_user_milliseconds``
     - All
     - Counter
     - Amount of time scheduled in user mode for this process.

   * - ``hardware_system_vm_page_swap_in``
     - Unix
     - Counter
     - Number of pages the system has swapped in from disk.

   * - ``hardware_system_vm_page_swap_out``
     - Unix
     - Counter
     - Number of pages the system has swapped out to disk.

   * - ``hardware_system_memory_mem_total``
     - Unix
     - Gauge
     - Total usable RAM (physical RAM minus a few reserved bits and the kernel binary code).

   * - ``hardware_system_memory_mem_free``
     - Unix
     - Gauge
     - Sum of ``LowFree`` + ``HighFree``.

   * - ``hardware_system_memory_mem_available``
     - Unix
     - Gauge
     - An estimate of how much memory is available for starting new applications, without swapping.

   * - ``hardware_system_memory_buffers``
     - Unix
     - Gauge
     - Temporary storage for raw disk blocks that shouldn't get tremendously large.

   * - ``hardware_system_memory_cached``
     - Unix
     - Gauge
     - In-memory cache for files read from the disk. This doesn't include ``SwapCached``.

   * - ``hardware_system_memory_swap_total``
     - Unix
     - Gauge
     - Total amount of swap space available.

   * - ``hardware_system_memory_swap_free``
     - Unix
     - Gauge
     - Total amount of swap space unused.

   * - ``hardware_system_memory_shared_mem``
     - Unix
     - Gauge
     - Amount of memory consumed in file systems whose contents reside in virtual memory.

   * - ``hardware_system_memory_swap_free_kilobytes``
     - All
     - Gauge
     - Total amount of swap space unused.

   * - ``hardware_system_memory_swap_total_kilobytes``
     - All
     - Gauge
     - Total amount of swap space available.

   * - ``hardware_platform_num_logical_cpus``
     - All
     - Gauge
     - Number of logical CPUs usable by the current process.

   * - ``hardware_system_network_eth0_bytes_in_bytes``
     - All
     - Counter
     - Number of bytes of data received by the interface.

   * - ``hardware_system_network_eth0_bytes_out_bytes``
     - All
     - Counter
     - Number of bytes of data transmitted by the interface.

   * - ``hardware_system_network_lo_bytes_in_bytes``
     - All
     - Counter
     - Number of bytes of data received by the interface.

   * - ``hardware_system_network_lo_bytes_out_bytes``
     - All
     - Counter
     - Number of bytes of data transmitted by the interface.
