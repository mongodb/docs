.. list-table::
   :header-rows: 1
   :widths: 55 13 32

   * - Name
     - Type
     - Description

   * - ``hardware_disk_metrics_disk_space_free_bytes``
     - Gauge
     - Disk space available in the mounted file system.

   * - ``hardware_disk_metrics_disk_space_used_bytes``
     - Gauge
     - Disk space used in the mounted file system.

   * - ``hardware_disk_metrics_read_count``
     - Counter
     - Number of read I/O's processed.

   * - ``hardware_disk_metrics_read_time_milliseconds``
     - Counter
     - Total wait time for read requests.

   * - ``hardware_disk_metrics_total_time_milliseconds``
     - Counter
     - Total time this block device is active.

   * - ``hardware_disk_metrics_weighted_time_io_milliseconds``
     - Counter
     - Weighted time spent doing I/O's.

   * - ``hardware_disk_metrics_write_count``
     - Counter
     - Number of write I/O's processed.

   * - ``hardware_disk_metrics_write_time_milliseconds``
     - Counter
     - Total wait time for write requests.

   * - ``hardware_platform_num_logical_cpus``
     - Gauge
     - Number of logical CPUs usable by the current process.

   * - ``hardware_process_cpu_children_kernel_milliseconds``
     - Counter
     - Amount of time scheduled in kernel mode for this process to wait for children.

   * - ``hardware_process_cpu_children_user_milliseconds``
     - Counter
     - Amount of time scheduled in user mode for this process to wait for children.

   * - ``hardware_process_cpu_kernel_milliseconds``
     - Counter
     - Amount of time scheduled in kernel mode for this process.

   * - ``hardware_process_cpu_user_milliseconds``
     - Counter
     - Amount of time scheduled in user mode for this process.

   * - ``hardware_system_cpu_guest_milliseconds``
     - Counter
     - Time spent running a virtual CPU for the guest operating systems under the control of the Linux kernel.

   * - ``hardware_system_cpu_guest_nice_milliseconds``
     - Counter
     - Time spent running a guest with an adjusted niceness.

   * - ``hardware_system_cpu_idle_milliseconds``
     - Counter
     - Time spent in the idle task.

   * - ``hardware_system_cpu_io_wait_milliseconds``
     - Counter
     - Time waiting for I/O to complete.

   * - ``hardware_system_cpu_irq_milliseconds``
     - Counter
     - Time spent servicing interrupts.

   * - ``hardware_system_cpu_kernel_milliseconds``
     - Counter
     - Time spent in system mode.

   * - ``hardware_system_cpu_nice_milliseconds``
     - Counter
     - Time spent in user mode with low priority (nice).

   * - ``hardware_system_cpu_soft_irq_milliseconds``
     - Counter
     - Time spent servicing ``softirqs``.

   * - ``hardware_system_cpu_steal_milliseconds``
     - Counter
     - Time spent in other operating systems when running in a virtual
       environment.

   * - ``hardware_system_cpu_user_milliseconds``
     - Counter
     - Time spent in user mode.

   * - ``hardware_system_memory_buffers_kilobytes``
     - Gauge
     - Temporary storage for raw disk blocks that shouldn't get tremendously large.

   * - ``hardware_system_memory_cached_kilobytes``
     - Gauge
     - In-memory cache for files read from the disk. This doesn't include ``SwapCached``.

   * - ``hardware_system_memory_mem_available_kilobytes``
     - Gauge
     - An estimate of how much memory is available for starting new applications, without swapping.

   * - ``hardware_system_memory_mem_free_kilobytes``
     - Gauge
     - Sum of ``LowFree`` + ``HighFree``.

   * - ``hardware_system_memory_mem_total_kilobytes``
     - Gauge
     - Total usable RAM (physical RAM minus a few reserved bits and the kernel binary code).

   * - ``hardware_system_memory_shared_mem_kilobytes``
     - Gauge
     - Amount of memory consumed in file systems whose contents reside in virtual memory.

   * - ``hardware_system_memory_swap_free_kilobytes``
     - Gauge
     - Total amount of swap space unused.

   * - ``hardware_system_memory_swap_total_kilobytes``
     - Gauge
     - Total amount of swap space available.

   * - ``hardware_system_network_eth0_bytes_in_bytes``
     - Counter
     - Number of bytes of data received by the interface.

   * - ``hardware_system_network_eth0_bytes_out_bytes``
     - Counter
     - Number of bytes of data transmitted by the interface.

   * - ``hardware_system_network_lo_bytes_in_bytes``
     - Counter
     - Number of bytes of data received by the interface.

   * - ``hardware_system_network_lo_bytes_out_bytes``
     - Counter
     - Number of bytes of data transmitted by the interface.

   * - ``hardware_system_vm_page_swap_in``
     - Counter
     - Number of pages the system has swapped in from disk.

   * - ``hardware_system_vm_page_swap_out``
     - Counter
     - Number of pages the system has swapped out to disk.
