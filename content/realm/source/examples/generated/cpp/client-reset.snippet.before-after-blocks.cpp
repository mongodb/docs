/* You can define blocks to call before and after the client reset occur
   if you need to execute specific logic, such as reporting or debugging. */
auto beforeReset = [&](realm::db before) {
  /* A block called after a client reset error is detected, but before the
     client recovery process is executed. You could use this block for any
     custom logic, reporting, debugging etc. You have access to the database
     before the client reset occurs in this block. */
};

auto afterReset = [&](realm::db device, realm::db server) {
  /* A block called after the client recovery process has executed.
     This block could be used for custom recovery, reporting, debugging etc.
     You have access to the database that is currently on the device - the
     one that can no longer sync - and the new database that has been
     restored from the server. */
};
