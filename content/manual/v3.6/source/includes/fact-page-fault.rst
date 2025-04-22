With the MMAPv1 storage engine, page faults can occur as
MongoDB reads from or writes data to parts of its data files that are
not currently located in physical memory. In contrast, operating system
page faults happen when physical memory is exhausted and pages of
physical memory are swapped to disk.
